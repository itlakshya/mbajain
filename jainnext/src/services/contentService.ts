/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getPageContent(url: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract the key content from this URL: ${url}. 
    I need:
    1. Program Overview
    2. Key Highlights
    3. Curriculum (Semester-wise if possible)
    4. Eligibility Criteria
    5. Career Opportunities
    
    Please provide the content in a structured JSON format. 
    DO NOT include any fee information.`,
    config: {
      responseMimeType: "application/json",
    }
  });
  
  return JSON.parse(response.text || "{}");
}
