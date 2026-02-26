"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

export function InvestmentSimulator() {
    const [amount, setAmount] = useState<number>(5000)
    const [months, setMonths] = useState<number>(12)

    const annualRate = 0.125 // 12.5% APY
    const totalReturn = amount * (1 + (annualRate * (months / 12)))
    const profit = totalReturn - amount

    return (
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Input Section */}
                <div className="p-8 md:p-12 space-y-8 bg-slate-50 dark:bg-slate-900/50">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Simula tu Inversión</h3>
                        <p className="text-slate-600 dark:text-slate-400">Calcula tus rendimientos estimados según el monto y plazo que elijas con INVI.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">¿Cuánto quieres invertir?</label>
                            <span className="text-2xl font-bold text-primary">${amount.toLocaleString('en-US')}</span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="50000"
                            step="500"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-slate-500 font-medium">
                            <span>$500</span>
                            <span>$50,000+</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Plazo Estimado</label>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{months} <span className="text-lg text-slate-500">meses</span></span>
                        </div>
                        <input
                            type="range"
                            min="6"
                            max="36"
                            step="6"
                            value={months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-slate-500 font-medium">
                            <span>6 ms</span>
                            <span>36 ms</span>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="p-8 md:p-12 bg-primary dark:bg-primary/20 text-white dark:text-slate-100 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 space-y-8">
                        <div>
                            <p className="text-primary-foreground/80 dark:text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">Retorno Total Estimado</p>
                            <h4 className="text-5xl font-extrabold tracking-tight">${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h4>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary-foreground/20 dark:border-slate-700">
                            <div>
                                <p className="text-primary-foreground/80 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Monto Inicial</p>
                                <p className="text-xl font-bold">${amount.toLocaleString('en-US')}</p>
                            </div>
                            <div>
                                <p className="text-primary-foreground/80 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Ganancia Estimada</p>
                                <p className="text-xl font-bold text-emerald-300 dark:text-emerald-400">+${profit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                            </div>
                        </div>

                        <Button asChild size="lg" className="w-full mt-4 h-14 bg-white text-primary hover:bg-slate-100 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 font-bold text-lg shadow-xl shadow-black/10 transition-transform active:scale-95">
                            <Link href="/login">¡Comienza Hoy!</Link>
                        </Button>

                        <p className="text-[10px] text-center text-primary-foreground/60 dark:text-slate-500">
                            *Las proyecciones son en base a un Histórico Promedio APY de {(annualRate * 100).toFixed(1)}%. Rendimientos pasados no garantizan rendimientos futuros. Sujeto a variaciones del mercado.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
