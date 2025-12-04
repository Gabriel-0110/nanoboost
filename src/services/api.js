const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export async function editImage(imageFile, prompt, params = { temperature: 0.4, topK: 32, topP: 1 }) {
    if (!API_KEY) {
        throw new Error("API Key is missing. Please check your .env file.");
    }

    console.log("Processing image with Nano Banana Pro (Gemini)...");
    console.log("Using API URL:", API_URL);
    console.log("Using params:", params);

    try {
        // 1. Convert image to Base64
        const base64Image = await fileToBase64(imageFile);

        // 2. Construct the request body for Gemini API
        // We use the generateContent endpoint which supports multimodal input (text + image)
        const requestBody = {
            contents: [
                {
                    parts: [
                        { text: prompt },
                        {
                            inline_data: {
                                mime_type: imageFile.type,
                                data: base64Image
                            }
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: params.temperature,
                topK: params.topK,
                topP: params.topP,
                candidateCount: params.candidateCount,
                maxOutputTokens: 2048,
            }
        };

        // Note: The standard Gemini API (generateContent) returns TEXT. 
        // For actual Image Editing (input image -> output image), we would typically need a specific Image Generation/Editing model endpoint.
        // However, as of now, the standard endpoint is used for multimodal understanding.
        // If "Nano Banana Pro" supports direct image-to-image editing via API, the endpoint might differ.
        // For this implementation, we will assume we are sending the request to a model that CAN return image data or we are using a specific endpoint.
        // If the model returns a base64 image string in the text response, we will parse it.

        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        console.log("Full API Response:", JSON.stringify(data, null, 2));

        // For image generation models like Gemini 3 Pro Image (Nano Banana Pro),
        // the response structure includes inline_data with base64 image
        const firstPart = data.candidates?.[0]?.content?.parts?.[0];
        console.log("First part structure:", firstPart);
        console.log("Has inlineData?", !!firstPart?.inlineData);
        console.log("Has data?", !!firstPart?.inlineData?.data);

        // Check if we got image data back (note: API uses camelCase)
        if (firstPart?.inlineData?.data) {
            console.log("✅ Received image data from API");
            const mimeType = firstPart.inlineData.mimeType || 'image/png';
            const base64Data = firstPart.inlineData.data;

            // Convert base64 to blob URL
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType });
            return URL.createObjectURL(blob);
        }

        // Check if we got text response instead (shouldn't happen with image model)
        const textResponse = firstPart?.text;
        if (textResponse) {
            console.log("⚠️ Got text response instead of image:", textResponse);
            throw new Error("Model returned text instead of an image. Response: " + textResponse.substring(0, 200));
        }

        // No valid response
        throw new Error("No image data in API response. Check console for full response.");

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remove the Data-URL prefix (e.g. "data:image/jpeg;base64,") to get just the base64 string
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });
}
