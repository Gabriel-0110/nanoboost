import { useState, useRef } from 'react'

export default function ImageUploader({ onImageSelect }) {
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null)

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageSelect(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            onImageSelect(e.target.files[0])
        }
    }

    const onButtonClick = () => {
        inputRef.current.click()
    }

    return (
        <div
            className={`glass-panel`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
                border: dragActive ? '2px dashed var(--primary-color)' : '2px dashed var(--border-color)',
                textAlign: 'center',
                padding: '4rem 2rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: dragActive ? 'var(--surface-hover)' : 'var(--surface-color)'
            }}
            onClick={onButtonClick}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.8 }}>🖼️</div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Upload your photo</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0' }}>
                Drag & drop or click to browse
            </p>
        </div>
    )
}
