import React, { useState } from 'react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStep, setMenuStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [transactionCode, setTransactionCode] = useState('');

  const handleOpenMenu = () => {
    setIsOpen(true);
    setMenuStep(1);
    setSelectedOption('');
    setClientEmail('');
    setTransactionCode('');
  };

  const selectOption = (option, choiceText) => {
    setSelectedOption(choiceText);
    setMenuStep(2);
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (transactionCode.trim().length > 4) {
      setMenuStep(3); // Moves to final delivery step
    } else {
      alert("Invalid reference entry. Please check your payment slip.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 font-mono">
      
      {/* Main Trigger Section */}
      <div className="max-w-sm w-full text-center space-y-6 border border-neutral-800 p-8 rounded-2xl bg-neutral-900/40">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-200">Thousand Miles</h1>
        <p className="text-neutral-500 text-xs">Select a tier below to initialize product data provisioning.</p>
        
        <button 
          onClick={handleOpenMenu} 
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all text-sm tracking-wide shadow-lg"
        >
          ⚡ Buy Product Data Bundle
        </button>
      </div>

      {/* Network Prompt Simulation Box */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-neutral-900 border-2 border-neutral-800 w-full max-w-sm rounded-xl p-5 shadow-2xl space-y-4">
            
            {/* Header Simulator */}
            <div className="flex justify-between items-center text-[11px] text-neutral-500 border-b border-neutral-800 pb-2">
              <span>SERVICE PROMPT: DIAL_REQUEST</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-white font-bold text-sm">✕</button>
            </div>

            {/* STEP 1: Main Menu Choices */}
            {menuStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Select International Product Package:
                </p>
                <div className="space-y-2 text-sm text-neutral-200">
                  <button onClick={() => selectOption('1', 'Tier 1 Data Package ($2)')} className="w-full text-left p-2.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 transition-all">
                    1) Tier 1 Data Package ($2)
                  </button>
                  <button onClick={() => selectOption('2', 'Tier 2 Premium Bundle ($5)')} className="w-full text-left p-2.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 transition-all">
                    2) Tier 2 Premium Bundle ($5)
                  </button>
                </div>
                <div className="flex justify-end pt-2">
                  <button onClick={() => setIsOpen(false)} className="text-xs text-neutral-400 hover:text-neutral-200 px-3 py-1.5 rounded bg-neutral-800">Cancel</button>
                </div>
              </div>
            )}

            {/* STEP 2: Payment Routing & Info Verification */}
            {menuStep === 2 && (
              <form onSubmit={handleSubmitDetails} className="space-y-4 text-xs">
                <p className="text-neutral-400 leading-relaxed">
                  You selected: <span className="text-white font-bold">{selectedOption}</span>. 
                  [span_1](start_span)Please wire funds via <span className="text-emerald-400">Remitly</span>, <span className="text-emerald-400">Sendwave</span>, or <span className="text-emerald-400">WorldRemit</span> directly to the banking channel reference below[span_1](end_span):
                </p>

                [span_2](start_span){/* Secure Bank Profile Information */}
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-1.5 text-[11px] text-neutral-300">
                  <div><span className="text-neutral-500">Bank Name:</span> Co-operative Bank of Kenya[span_2](end_span)</div>
                  <div><span className="text-neutral-500">Acc Name:</span> Humphrey Osoro</div>
                  <div><span className="text-neutral-500">Acc Line:</span> <span className="text-emerald-400 font-bold">25472743396001</span></div>
                </div>

                {/* Network Inputs */}
                <div className="space-y-2.5">
                  <div>
                    <label className="text-neutral-500 block mb-1 uppercase tracking-wider text-[10px]">Delivery Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@domain.com" 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-500 block mb-1 uppercase tracking-wider text-[10px]">Transaction Reference / Receipt Number</label>
                    <input 
                      type="text" 
                      required 
                      value={transactionCode}
                      onChange={(e) => setTransactionCode(e.target.value)}
                      placeholder="e.g. REMIT-83921" 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-emerald-400 outline-none focus:border-neutral-700"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button type="button" onClick={() => setMenuStep(1)} className="text-neutral-400 hover:text-neutral-200 py-1.5 px-3 rounded bg-neutral-800">Back</button>
                  <button type="submit" className="bg-white text-black font-bold py-1.5 px-4 rounded hover:bg-neutral-200">Send Response</button>
                </div>
              </form>
            )}

            {/* STEP 3: Automated Data Bundle Delivery */}
            {menuStep === 3 && (
              <div className="space-y-4 text-center text-xs">
                <div className="p-2 bg-emerald-950/40 border border-emerald-800 text-emerald-400 rounded-lg">
                  ✔ Verification Successful. Provisioning completed.
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Your package access key is ready. Tap the terminal link below to fetch your package components instantly:
                </p>
                
                <div className="py-2">
                  {/* Swap out this placeholder URL with your real downloadable resource file asset */}
                  <a 
                    href="https://your-hosting-or-drive-link-to-product.com/download" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block bg-white text-black font-bold px-5 py-2.5 rounded-lg hover:bg-neutral-200 transition-all shadow-md"
                  >
                    📥 Download Package Component
                  </a>
                </div>

                <div className="text-[10px] text-neutral-500 font-mono">
                  Receipt backup generated for: <br/>
                  <span className="text-neutral-300">{clientEmail}</span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}


