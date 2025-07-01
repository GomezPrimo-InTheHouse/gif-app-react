import { useState } from "react";
import axios from "axios";
import Historial from "./Historial";



const Inputcard = ({ history, setHistory }) => {
    const [inputValue, setInputValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [gifUrl, setGifUrl] = useState(null);

    const [loading, setLoading] = useState(false);




    const validateQuestion = (text) => {
        const validacion = text.trim();
        return (
            validacion.endsWith("?") &&
            (validacion.startsWith("¿") || /^[^¿]/.test(validacion))
        );
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsValid(validateQuestion(value));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://yesno.wtf/api");
            setGifUrl(response.data.image);

            setHistory(prev => [
                ...prev.slice(-9), // solo las últimas 9
                {
                    question: inputValue,
                    answer: response.data.answer, // yes, no, maybe
                    image: response.data.image,
                },
            ]);
        } catch (error) {
            console.error("Error al obtener el GIF:", error);
            setGifUrl(null);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center mb-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Haz tu pregunta</h2>

                <input
                    type="text"
                    placeholder="EJ: ¿Aprobaré el coloquio?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inputValue}
                    onChange={handleChange}
                />

                <button
                    className={`mt-4 w-full p-3 rounded-lg text-white font-semibold transition ${isValid
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={!isValid || loading}
                    onClick={handleSubmit}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                        </div>
                    ) : (
                        "Enviar Pregunta"
                    )}

                </button>

                {!isValid && inputValue && (
                    <p className="text-sm text-red-500 mt-2">
                        Solo se aceptan preguntas que terminen en "?" o empiecen con "¿" y terminen con "?".
                    </p>
                )}

                {/* {gifUrl && (
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2 text-gray-700">Respuesta:</h3>
                        <img
                            src={gifUrl}
                            alt="Respuesta GIF"
                            className="mx-auto rounded-lg max-w-full h-auto"
                        />
                    </div>
                )}
                
                */}


                {loading ? (
                    <div className="mt-6 flex flex-col items-center justify-center">
                        <p className="text-gray-500 text-sm mb-2">Cargando respuesta...</p>
                        <svg
                            className="animate-spin h-8 w-8 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            ></path>
                        </svg>
                    </div>
                ) : (
                    gifUrl && (
                        <div className="mt-6">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">Respuesta:</h3>
                            <img
                                src={gifUrl}
                                alt="Respuesta GIF"
                                className="mx-auto rounded-lg max-w-full h-auto"
                            />
                        </div>
                    )
                )}

            </div>

        </div>

    );
};

export default Inputcard;
