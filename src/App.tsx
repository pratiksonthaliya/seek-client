import { useState } from "react"
import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import MdPreview from "./components/MdPreview";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { setCodeGenerationLoading, setGeneratedCode, updateGeneratedCode } from "./redux/slices/codeGeneration";
import { CodeXml, Loader, RotateCcw, StepForward, X } from "lucide-react";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;  
  const [prompt, setPrompt] = useState<string>("");
  const dispatch = useAppDispatch();
  const aiGeneratedCode = useAppSelector((state) => state.codeGenerationSlice.generatedCode);
  const codeGenerationLoading = useAppSelector((state) => state.codeGenerationSlice.loading);

  const handleGenerateCode = async () => {
    if (!prompt || prompt.trim() === "") {
      // Handle with toast
      alert("Please enter a prompt to generate code");
      return;
    }
    try {
      dispatch(setCodeGenerationLoading(true));
      setPrompt("");
      let aiGeneratedCode = await axios.post(`${API_URL}/api` as string, {prompt: `Generate Code: ${prompt}`});
      if(aiGeneratedCode.data.response.startsWith("$~~~$")) {
        alert("Error generating code. Please provide a valid prompt.");
        return;
      }

      aiGeneratedCode = aiGeneratedCode.data.response.replace(/\$@\$\w+=undefined-rv1\$@\$/g, "").trim();
      dispatch(setGeneratedCode(aiGeneratedCode as unknown as string)); 
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setCodeGenerationLoading(false));
    }
  }

  const handleContinueGeneration = async () => {
    if (!prompt || prompt.trim() === "") {
      // Handle with toast
      alert("Please enter a prompt to continue generating code");
      return;
    }
    try {
      setPrompt("");
      dispatch(setCodeGenerationLoading(true));
      let continueCode = await axios.post(`${API_URL}/api/continue` as string, {prompt: `Generate Code: ${prompt}`, content: aiGeneratedCode});
      if(continueCode.data.response.startsWith("$~~~$")) {
        alert("Error generating code. Please provide a valid prompt.");
        return;
      }
      continueCode = continueCode.data.response.replace(/\$@\$\w+=undefined-rv1\$@\$/g, "").trim();
      dispatch(updateGeneratedCode(continueCode as unknown as string));      
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setCodeGenerationLoading(false));
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-3">
      <h1 className="text-2xl md:text-4xl text-center w-full font-bold mt-3"> Seek - AI Code Generator</h1>
      <div className="__input_prompt_container w-screen flex flex-col pt-5 md:px-20 px-5 justify-center items-center gap-3 mt-3 mb-5">
        <Textarea
          placeholder="Create a Todos App using React..." 
          className="w-full h-48 md:h-60 text-md"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {codeGenerationLoading ? (
          <>
            <Loader className="animate-spin" />
          </>
        ) : (
          <div className="flex flex-col md:flex-row gap-2 ">
          <Button className="md:text-md flex justify-center items-center gap-1" variant="secondary" onClick={handleGenerateCode}>
            {aiGeneratedCode ? (
              <>Regenerate Code <RotateCcw size={16}/></>
              ) : (
              <>Generate Code <CodeXml size={16}/></>
            )}
          </Button>
          {aiGeneratedCode && (
            <Button 
              className="md:text-md flex justify-center items-center gap-1" 
              variant="outline"
              onClick={handleContinueGeneration}
            >
              Continue Generation
              <StepForward size={16}/> 
            </Button>
          )}
          {aiGeneratedCode && (
            <Button className="md:text-md flex justify-center items-center gap-1" variant="destructive"
            onClick={() => {
              dispatch(setGeneratedCode(""));
              setPrompt("");
            }}
            >
              Clean Code <X/>
            </Button>
          )}
          </div>
        )}
      </div>
      {aiGeneratedCode &&
        <div className="px-3 md:px-10 w-screen">
          <MdPreview source={aiGeneratedCode}/>
        </div>
      }
    </div>
  )
}

export default App
