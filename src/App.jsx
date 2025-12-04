import { useState } from 'react'
import './index.css'
import ImageUploader from './components/ImageUploader'
import EditorControls from './components/EditorControls'
import ResultPreview from './components/ResultPreview'
import { editImage } from './services/api'

function App() {
  const [originalImage, setOriginalImage] = useState(null)
  const [originalImageFile, setOriginalImageFile] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [resultImages, setResultImages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [params, setParams] = useState({
    temperature: 0.4,
    topK: 32,
    topP: 1,
    candidateCount: 1,
    aspectRatio: '1:1'
  })

  const handleImageSelect = (file) => {
    setOriginalImageFile(file)
    setOriginalImage(URL.createObjectURL(file))
    setResultImage(null)
  }

  const handleGenerate = async () => {
    if (!originalImageFile || !prompt) return

    setIsGenerating(true)
    try {
      // If we have results, use the first result for refinement
      let imageToEdit = originalImageFile;
      if (resultImages.length > 0) {
        // Convert blob URL back to file
        const response = await fetch(resultImages[0]);
        const blob = await response.blob();
        imageToEdit = new File([blob], 'refined-image.png', { type: 'image/png' });
      }

      const resultUrls = await editImage(imageToEdit, prompt, params)
      setResultImages(Array.isArray(resultUrls) ? resultUrls : [resultUrls])
    } catch (error) {
      console.error("Error generating image:", error)
      alert(`Failed to generate image: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setOriginalImage(null)
    setOriginalImageFile(null)
    setPrompt('')
    setResultImage(null)
  }

  return (
    <div className="app-container">
      <header style={{
        marginBottom: '4rem',
        textAlign: 'center',
        position: 'relative',
        padding: '3rem 0'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: -1
        }}></div>

        <h1 style={{
          fontSize: '4.5rem',
          background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
          fontWeight: '800',
          letterSpacing: '-0.05em',
          lineHeight: '1'
        }}>
          Nano Banana Pro
        </h1>

        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.25rem',
          margin: '0 auto',
          maxWidth: '600px',
          fontWeight: '500'
        }}>
          Advanced AI-Powered Image Editing
        </p>

        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <span style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>✨ Gemini 3 Pro</span>
          <span style={{
            background: 'rgba(236, 72, 153, 0.1)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>🎨 Pro Templates</span>
          <span style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>🔄 Iterative Editing</span>
        </div>
      </header>

      <main>
        {!originalImage ? (
          <ImageUploader onImageSelect={handleImageSelect} />
        ) : (
          <div className="fade-in">
            <ResultPreview
              originalImage={originalImage}
              resultImages={resultImages}
              onReset={handleReset}
            />

            {isGenerating && (
              <div className="glass-panel" style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                <h3>Generating with Nano Banana Pro...</h3>
                <p style={{ color: 'var(--text-muted)' }}>This may take a few moments</p>
              </div>
            )}

            {resultImages.length > 0 && !isGenerating && (
              <div className="glass-panel" style={{ marginTop: '2rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid var(--primary-color)' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>✨ Refine Your Results</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Make additional edits to your generated images. The changes will be applied to all results.
                </p>
                <EditorControls
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  params={params}
                  setParams={setParams}
                />
              </div>
            )}

            {!resultImages.length && !isGenerating && (
              <EditorControls
                prompt={prompt}
                setPrompt={setPrompt}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                params={params}
                setParams={setParams}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
