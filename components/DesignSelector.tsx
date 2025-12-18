"use client";

export default function DesignSelector({ templates, selected, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[92%] max-w-4xl shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Switch Templates</h2>
          <button
            onClick={onClose}
            className="text-2xl font-semibold text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => onSelect(tpl.id)}
              className={`cursor-pointer rounded-xl border shadow-sm hover:shadow-xl transition-all p-4 ${
                selected === tpl.id && "ring-4 ring-blue-400"
              }`}
            >
              {/* Preview Style (no image) */}
              <div className="h-36 bg-gray-100 rounded-md flex flex-col gap-2 p-3 text-[10px]">
                {tpl.id === 1 && (
                  <>
                    <div className="h-3 w-[70%] bg-gray-400 rounded"></div>
                    <div className="h-[2px] w-full bg-gray-300"></div>
                    <div className="h-2 w-[50%] bg-gray-300 rounded"></div>
                    <div className="h-2 w-[55%] bg-gray-300 rounded"></div>
                    <div className="h-2 w-[45%] bg-gray-300 rounded"></div>
                  </>
                )}

                {tpl.id === 2 && (
                  <>
                    <div className="h-3 w-[60%] bg-gray-500 rounded"></div>
                    <div className="h-[1px] w-full bg-gray-400"></div>
                    <div className="h-2 w-[80%] bg-gray-300 rounded"></div>
                    <div className="h-2 w-[40%] bg-gray-300 rounded"></div>
                    <div className="h-2 w-[75%] bg-gray-300 rounded"></div>
                  </>
                )}

                {tpl.id === 3 && (
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                    <div className="flex flex-col flex-1 gap-2 mt-1">
                      <div className="h-2 bg-gray-300 rounded w-[70%]"></div>
                      <div className="h-2 bg-gray-300 rounded w-[50%]"></div>
                      <div className="h-2 bg-gray-300 rounded w-[65%]"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="pt-3 text-center font-semibold text-lg">
                {tpl.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
