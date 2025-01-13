import React, { useState, useEffect } from "react";
import "./image-upload.scss";

type UploadProps = {
    // onUpload: (formData: FormData) => void;
    file: File | null,
    setFile: (file: File | null) => void
    initialPreview?: string; // URL или base64 изображение
};

export const UploadComponent2: React.FC<UploadProps> = ({ file, setFile, initialPreview }) => {
//   const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError("Пожалуйста, выберите файл изображения.");
        setFile(null);
        setPreview(null);
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Генерируем временную ссылку для нового файла
      setError(null);
    }
  };

  // Освобождение ресурсов для превью
  useEffect(() => {
    return () => {
      if (preview && preview !== initialPreview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, initialPreview]);

//   const handleUploadClick = () => {
//     if (!file) {
//       setError("Выберите файл перед загрузкой.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("photo", file);

//     onUpload(formData);
//   };

  return (
    <div className="upload-container">
      <div className="file-input-wrapper" onClick={() => document.getElementById("fileInput")?.click()}>
        {preview ? (
          <img src={preview} alt="Preview" className="upload-file-preview" />
        ) : (
          <div className="placeholder">
            <p>Выберите файл</p>
          </div>
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }} // Скрываем input
        />
      </div>
      {error && <p className="upload-error-text">{error}</p>}
      {/* <button onClick={handleUploadClick} className="upload-button" disabled={!file && !initialPreview}>
        Загрузить
      </button> */}
    </div>
  );
};

// export default UploadComponent;