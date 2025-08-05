import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const COLORS = ['#4CAF50', '#FF9800', '#F44336'];

const oaData = [
  { name: 'Contar hasta 10', dominio: 90 },
  { name: 'Sumas simples', dominio: 40 },
  { name: 'Restas simples', dominio: 20 },
];

const App = () => {
  const [selectedOA, setSelectedOA] = useState<any>(null);
  const [result, setResult] = useState<boolean | null>(null);

  const handleDiagnostic = () => {
    const success = Math.random() > 0.3;
    setResult(success);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
      <div className="border rounded-2xl p-4 shadow-md space-y-4 bg-white">
        <h2 className="text-xl font-bold">Selecciona un OA</h2>
        {oaData.map((oa, idx) => (
          <button
            key={idx}
            className="border rounded-lg px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              setSelectedOA(oa);
              setResult(null);
            }}
          >
            {oa.name}
          </button>
        ))}

        {selectedOA && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Diagnóstico: {selectedOA.name}</h3>
            <p>¿Cuántas pelotas hay? 🎾🎾🎾</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleDiagnostic}
            >
              Responder
            </button>
            {result !== null && (
              <p className={result ? 'text-green-600' : 'text-red-600'}>
                {result ? '¡Correcto!' : 'Incorrecto. Vamos a enseñarte de otra forma.'}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="border rounded-2xl p-4 shadow-md bg-white">
        <h2 className="text-xl font-bold mb-4">Perfil de Aprendizaje</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={oaData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="dominio">
              {oaData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default App;
