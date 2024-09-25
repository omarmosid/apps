"use client"; // Ensures this is a client-side component in Next.js

import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

export const ImgToText: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const captureImage = () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        setImage(screenshot);
        convertImageToText(screenshot);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageSrc = reader.result as string;
        setImage(imageSrc);
        convertImageToText(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToText = (imageSrc: string) => {
    setLoading(true);
    Tesseract.recognize(imageSrc, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        OCR Image to Text
      </h1>

      <div className="w-full max-w-lg">
        {/* Webcam component */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full rounded-lg shadow-lg mb-6"
        />

        {/* Buttons to capture or upload */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={captureImage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Capture Image
          </button>
          <label className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Display captured or uploaded image */}
        {image && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Selected Image:
            </h2>
            <img src={image} alt="Captured" className="w-full rounded-lg" />
          </div>
        )}

        {/* Processing spinner */}
        {loading && (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Processing...
            </p>
          </div>
        )}

        {/* Display extracted text */}
        {text && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              Extracted Text:
            </h2>
            <p className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md">
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
