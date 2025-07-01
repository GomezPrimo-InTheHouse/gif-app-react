const Historial = ({ history }) => {
  const hasHistory = history.length > 0;

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Historial de Preguntas</h3>

        {!hasHistory ? (
          <p className="text-gray-500 text-center">Aún no han realizado ninguna pregunta.</p>
        ) : (
          <div className="grid gap-4">
            {history.slice(-10).reverse().map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded-xl flex flex-col md:flex-row items-center gap-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={`Respuesta: ${item.answer}`}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="text-left w-full">
                  <p className="text-gray-800 font-semibold">❓ {item.question}</p>
                  <p
                    className={`font-medium mt-1 ${
                        item.answer === "yes"
                        ? "text-green-600"
                        : item.answer === "no"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                    >
                    💬 Respuesta: <span className="capitalize">{item.answer}</span>
                    </p>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Historial;

