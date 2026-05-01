import { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from 'react-router'

const Home = () => {
    const { loading, generateReport } = useInterview();
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data && data._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (loading) {
        return (
            <main>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] text-white flex items-center justify-center p-6">

            <div className="w-full max-w-5xl">

                <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 leading-tight">
                    Elevate Your Career with{" "}
                    <span className="text-purple-400 italic">AI-Driven Insights.</span>
                </h1>

                <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
                    Transform your professional trajectory with high-fidelity interview simulations and architectural-grade feedback reports.
                </p>

                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm rounded-lg p-4 mb-8 text-center">
                    ⚠️ To generate a <span className="font-semibold">personalized report</span>, please upload your resume OR provide a detailed self-description.
                </div>


                <div className="bg-[#0f172a]/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-xl">


                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-purple-500/20 p-2 rounded-md">📄</div>
                            <div>
                                <p className="font-semibold">
                                    Professional Resume
                                </p>
                                <p className="text-xs text-gray-400">
                                    Upload your credentials in PDF format
                                </p>
                            </div>
                        </div>

                        <label className="border-2 border-dashed border-gray-700 rounded-xl h-40 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 transition cursor-pointer">

                            <input
                                ref={resumeInputRef}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                            />

                            <p>Drag & drop your resume here</p>
                            <p className="text-xs mt-1">MAX FILE SIZE 5MB (PDF ONLY)</p>
                        </label>
                    </div>


                    <div className="grid md:grid-cols-2 gap-6">


                        <div className="bg-[#020617]/60 border border-gray-800 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-green-500/20 p-2 rounded-md">👤</div>
                                <p className="font-semibold">
                                    Self-Description
                                </p>
                            </div>

                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                rows="4"
                                placeholder="Tell us about your background and goals..."
                                className="w-full bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none resize-none"
                            />
                        </div>

                        <div className="bg-[#020617]/60 border border-gray-800 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-orange-500/20 p-2 rounded-md">💼</div>
                                <p className="font-semibold">
                                    Target Job <span className="text-red-400">*</span>
                                </p>
                            </div>

                            <textarea
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                rows="4"
                                placeholder="Paste the job description you're targeting..."
                                className="w-full bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none resize-none"
                            />
                        </div>

                    </div>

                    {/* Button */}
                    <div className="flex justify-center mt-10">
                        <button onClick={handleGenerateReport} className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition text-white font-semibold shadow-lg">
                            Generate Report ✨
                        </button>
                    </div>


                    <p className="text-center text-xs text-gray-500 mt-4">
                        ESTIMATED TIME: 45s • AI PRECISION: 99.8%
                    </p>

                </div>
            </div>
        </div>
    )
};

export default Home;