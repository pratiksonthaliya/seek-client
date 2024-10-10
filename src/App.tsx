import { useState } from "react"
import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import MdPreview from "./components/MdPreview";
import axios from "axios";
import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "./redux/store";
import { setCodeGenerationLoading, setGeneratedCode, updateGeneratedCode } from "./redux/slices/codeGeneration";
import { CodeXml, Loader, RotateCcw, Sparkles, StepForward, X } from "lucide-react";

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
      let aiGeneratedCode = await axios.post(`${API_URL}/api` as string, {prompt: `Generate Code for given prompt: ${prompt}`});
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
    // if (!prompt || prompt.trim() === "") {
    //   // Handle with toast
    //   alert("Please enter a prompt to continue generating code");
    //   return;
    // }
    try {
      setPrompt("");
      dispatch(setCodeGenerationLoading(true));
      let continueCode = await axios.post(`${API_URL}/api/continue` as string, {prompt: `Generate Code for given prompt: ${prompt}`, content: aiGeneratedCode});
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen min-h-screen flex flex-col p-3 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <motion.h1 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-4xl md:text-5xl text-center w-full font-bold mt-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Seek - AI Code Generator
      </motion.h1>
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm md:text-lg text-center w-full font-bold mt-5 text-gray-300"
      >
        Get AI-generated code and solutions for your DSA questions—free and accessible!
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs md:text-sm text-center text-gray-400 mt-2 md:mt-1"
      >
        <span className="text-red-400">
          Disclaimer: 
        </span>
        <span>
          This service is free to use, but be aware that complex computations may sometimes fail.
        </span>
      </motion.p>
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="__input_prompt_container w-full max-w-3xl mx-auto flex flex-col pt-5 px-5 justify-center items-center gap-3 mt-10 mb-5"
      >
        <Textarea
          placeholder="Create a Todos App using React..." 
          className="w-full h-48 md:h-60 text-md bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {codeGenerationLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader className="text-purple-500" size={30} />
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row gap-2">
            <Button 
              className="md:text-md flex justify-center items-center gap-1 bg-purple-600 hover:bg-purple-700" 
              onClick={handleGenerateCode}
            >
              {aiGeneratedCode ? (
                <>Regenerate Code <RotateCcw size={16}/></>
              ) : (
                <>Generate Code <CodeXml size={16}/></>
              )}
            </Button>
            {aiGeneratedCode && (
              <Button 
                className="md:text-md flex justify-center items-center gap-1 bg-pink-600 hover:bg-pink-700" 
                onClick={handleContinueGeneration}
              >
                Continue Generation
                <StepForward size={16}/> 
              </Button>
            )}
            {aiGeneratedCode && (
              <Button 
                className="md:text-md flex justify-center items-center gap-1" 
                variant="destructive"
                onClick={() => {
                  dispatch(setGeneratedCode(""))
                  setPrompt("")
                }}
              >
                Clean Code <X/>
              </Button>
            )}
          </div>
        )}
      </motion.div>
      {aiGeneratedCode && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-3 md:px-10 w-full max-w-4xl mx-auto"
        >
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <MdPreview source={aiGeneratedCode}/>
          </div>
        </motion.div>
      )}
      <motion.div 
        className="fixed bottom-5 right-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Button 
          className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => alert("AI magic happening!")}
        >
          <Sparkles className="text-white" />
        </Button>
      </motion.div>
    </motion.div>
    // <div className="w-full min-h-screen flex flex-col p-3">
    //   <h1 className="text-3xl md:text-4xl text-center w-full font-bold mt-3"> 
    //     Seek - AI Code Generator
    //   </h1>
    //   <h3 className="text-sm md:text-lg text-center w-full font-bold mt-5 text-slate-400">
    //     Get AI-generated code and solutions for your DSA questions—free and accessible!
    //   </h3>
    //   <p className="text-xs md:text-md text-center text-slate-500 mt-1">
    //     <span className="text-red-500">
    //       Disclaimer: 
    //     </span>
    //     <span>
    //     This service is free to use, but be aware that complex computations may sometimes fail.
    //     </span>
    //   </p>
    //   <div className="__input_prompt_container w-screen flex flex-col pt-5 md:px-20 px-5 justify-center items-center gap-3 mt-3 mb-5">
    //     <Textarea
    //       placeholder="Create a Todos App using React..." 
    //       className="w-full h-48 md:h-60 text-md"
    //       rows={4}
    //       value={prompt}
    //       onChange={(e) => setPrompt(e.target.value)}
    //     />
    //     {codeGenerationLoading ? (
    //       <>
    //         <Loader className="animate-spin" />
    //       </>
    //     ) : (
    //       <div className="flex flex-col md:flex-row gap-2 ">
    //       <Button className="md:text-md flex justify-center items-center gap-1" variant="secondary" onClick={handleGenerateCode}>
    //         {aiGeneratedCode ? (
    //           <>Regenerate Code <RotateCcw size={16}/></>
    //           ) : (
    //           <>Generate Code <CodeXml size={16}/></>
    //         )}
    //       </Button>
    //       {aiGeneratedCode && (
    //         <Button 
    //           className="md:text-md flex justify-center items-center gap-1" 
    //           variant="outline"
    //           onClick={handleContinueGeneration}
    //         >
    //           Continue Generation
    //           <StepForward size={16}/> 
    //         </Button>
    //       )}
    //       {aiGeneratedCode && (
    //         <Button className="md:text-md flex justify-center items-center gap-1" variant="destructive"
    //         onClick={() => {
    //           dispatch(setGeneratedCode(""));
    //           setPrompt("");
    //         }}
    //         >
    //           Clean Code <X/>
    //         </Button>
    //       )}
    //       </div>
    //     )}
    //   </div>
    //   {aiGeneratedCode &&
    //     <div className="px-3 md:px-10 w-screen">
    //       <MdPreview source={aiGeneratedCode}/>
    //     </div>
    //   }
    // </div>
  )
}

export default App
