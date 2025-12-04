export default function ResultPreview({ originalImage, resultImages, onReset }) {
    return (
        <div className="glass-panel" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: resultImages.length > 0 ? '1fr 2fr' : '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Original</h4>
                    <img src={originalImage} alt="Original" style={{ width: '100%', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
                        {resultImages.length > 1 ? `Results (${resultImages.length})` : 'Result'}
                    </h4>
                    {resultImages.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: resultImages.length === 1 ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                            {resultImages.map((img, index) => (
                                <div key={index} style={{ position: 'relative' }}>
                                    <img
                                        src={img}
                                        alt={`Result ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            borderRadius: 'var(--radius)',
                                            border: '2px solid var(--primary-color)',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        background: 'var(--primary-color)',
                                        color: 'white',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        #{index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ width: '100%', height: '100%', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius)' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Waiting for result...</span>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-secondary" onClick={onReset}>Start Over</button>
                {resultImages.length > 0 && resultImages.map((img, index) => (
                    <button
                        key={index}
                        className="btn-primary"
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = img;
                            link.download = `edited-image-${index + 1}.png`;
                            link.click();
                        }}
                    >
                        Download #{index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}
