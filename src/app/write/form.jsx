"use client";
import axios from "axios";
import React, { useState } from "react";
import { FiImage } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';


export default function WriteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const convertImageToDataURL = async (file) => {
    try {
      const compressedFile = await imageCompression(file, { maxSizeMB: 0.1 }); // Adjust maxSizeMB as needed
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataUrl = selectedFile
        ? await convertImageToDataURL(selectedFile)
        : null;

      const response = await axios.post("/api/write", {
        title,
        content,
        imageUrl: dataUrl,
      });

      console.log(response, "response");

      if (response.status === 200) {
        alert("Post Created Successfully");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Error creating post");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-blue-500 p-8 rounded-md"
    >
      <h1 className="text-3xl font-bold mb-4 text-white text-center">
        Create a New Blog
      </h1>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mt-1"
        required
      />

      <textarea
        id="content"
        name="content"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mt-1"
        required
      ></textarea>

      <label className="block mb-2 text-white" htmlFor="file">
        Upload Image or File:
        <div className="flex items-center mt-1">
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-md mr-2"
          >
            <FiImage size={20} />
          </label>
          <span className="text-white">
            {selectedFile ? selectedFile.name : "No file selected"}
          </span>
        </div>
      </label>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-full hover:from-green-600 hover:to-blue-600"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
