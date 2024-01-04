"use client"
import React, { useState } from "react";
import { FiImage, FiFileText } from 'react-icons/fi';


export default function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Implement your logic to handle the form submission (e.g., send data to a server)
      console.log({ title, content, file });
    };
  
    return (
        <div className="max-w-2xl mx-auto  flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-blue-500 p-8 rounded-md">
          <h1 className="text-3xl font-bold mb-4 text-white text-center">Create a New Blog</h1>
  
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
              <span className="text-white">{selectedFile ? selectedFile.name : 'No file selected'}</span>
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
      </div>
  );
}
