import { useState } from 'react'

export default function EditorControls({ prompt, setPrompt, onGenerate, isGenerating, params, setParams }) {
    const [showAdvanced, setShowAdvanced] = useState(false)

    return (
        <div className="glass-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Edit Instructions</h3>

            {/* Prompt Templates */}
            <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Quick Templates:</h4>

                <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary-color)', marginRight: '0.5rem' }}>FACE:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <button className="btn-secondary" onClick={() => setPrompt('Enhance the subject subtly. Improve lighting, smooth skin slightly, refine facial features softly. Athletic build, muscular definition, toned physique. Replace the background with a clean, natural outdoor scene (forest, park, soft sunlight). Make the new background blend realistically with the lighting on the subject.')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>✨ Full Enhancement</button>
                        <button className="btn-secondary" onClick={() => setPrompt('Smooth skin texture, reduce blemishes, even skin tone, enhance jawline, sharper features')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Face Polish</button>
                        <button className="btn-secondary" onClick={() => setPrompt('Add defined jawline, stronger cheekbones, masculine facial structure')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Define Features</button>
                        <button className="btn-secondary" onClick={() => setPrompt('Professional lighting, smooth complexion, professional headshot quality')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Pro Headshot</button>
                    </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary-color)', marginRight: '0.5rem' }}>BODY:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <button className="btn-secondary" onClick={() => setPrompt('Athletic build, muscular definition, toned physique, enhance muscle visibility')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Athletic Build</button>
                        <button className="btn-secondary" onClick={() => setPrompt('Enhance abs definition, chest muscles, arm definition, fitness model physique')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Muscle Definition</button>
                        <button className="btn-secondary" onClick={() => setPrompt('Broader shoulders, V-taper physique, masculine proportions')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Broaden Build</button>
                    </div>
                </div>

                <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary-color)', marginRight: '0.5rem' }}>BACKGROUND:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <button className="btn-secondary" onClick={() => setPrompt('Replace the background with a clean, natural outdoor scene (forest, park, soft sunlight). Make the new background blend realistically with the lighting on the subject.')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Natural Outdoor</button>
                        <button className="btn-secondary" onClick={() => setPrompt('Modern urban background, city skyline, professional aesthetic')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Urban Scene</button>
                        <button className="btn-secondary" onClick={() => setPrompt('Studio background, professional photography setup, dramatic lighting')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Studio Setup</button>
                        <button className="btn-secondary" onClick={() => setPrompt('Remove background completely, clean white background')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Remove BG</button>
                    </div>
                </div>
            </div>

            <textarea
                id="edit-prompt"
                name="edit-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how you want to change the image (e.g., 'Make it look like a cyberpunk city', 'Remove the background')"
                rows={4}
                style={{ marginBottom: '1rem', resize: 'vertical' }}
            />

            <div style={{ marginBottom: '1.5rem' }}>
                <button
                    className="btn-secondary"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                    {showAdvanced ? '▼' : '▶'} Advanced Parameters
                </button>
            </div>

            {showAdvanced && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius)' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span>Temperature: {params.temperature}</span>
                            <span style={{ color: 'var(--text-muted)' }}>Randomness</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={params.temperature}
                            onChange={(e) => setParams({ ...params, temperature: parseFloat(e.target.value) })}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span>Top-K: {params.topK}</span>
                            <span style={{ color: 'var(--text-muted)' }}>Token sampling</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value={params.topK}
                            onChange={(e) => setParams({ ...params, topK: parseInt(e.target.value) })}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span>Top-P: {params.topP}</span>
                            <span style={{ color: 'var(--text-muted)' }}>Nucleus sampling</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={params.topP}
                            onChange={(e) => setParams({ ...params, topP: parseFloat(e.target.value) })}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span>Number of Images: {params.candidateCount}</span>
                            <span style={{ color: 'var(--text-muted)' }}>Variations</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="4"
                            step="1"
                            value={params.candidateCount}
                            onChange={(e) => setParams({ ...params, candidateCount: parseInt(e.target.value) })}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                            <span>Aspect Ratio</span>
                            <span style={{ color: 'var(--text-muted)' }}>Output size</span>
                        </label>
                        <select
                            value={params.aspectRatio}
                            onChange={(e) => setParams({ ...params, aspectRatio: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-color)',
                                borderRadius: 'var(--radius)',
                                fontSize: '0.875rem'
                            }}
                        >
                            <option value="1:1">1:1 (Square)</option>
                            <option value="16:9">16:9 (Landscape)</option>
                            <option value="9:16">9:16 (Portrait)</option>
                            <option value="4:3">4:3 (Standard)</option>
                            <option value="3:4">3:4 (Portrait)</option>
                        </select>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className="btn-primary"
                    onClick={onGenerate}
                    disabled={isGenerating}
                    style={{ opacity: isGenerating ? 0.7 : 1, cursor: isGenerating ? 'wait' : 'pointer' }}
                >
                    {isGenerating ? 'Generating...' : 'Generate Edit ✨'}
                </button>
            </div>
        </div>
    )
}
