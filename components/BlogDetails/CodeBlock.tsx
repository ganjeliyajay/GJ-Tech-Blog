'use client';

import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      showToast('Code snippet copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy snippet', 'error');
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative my-6 rounded-2xl border border-slate-700/60 dark:border-slate-800 bg-slate-950 shadow-2xl overflow-hidden text-slate-100">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-2 pl-2">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono text-slate-300">
              {filename || `${language} snippet`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
            {language}
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition border border-slate-700"
            aria-label="Copy code snippet"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content with Line Numbers */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed bg-[#0a0f1d]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="w-8 pr-4 text-right text-slate-600 select-none text-xs align-top pt-0.5">
                  {idx + 1}
                </td>
                <td className="text-slate-200 whitespace-pre font-mono">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
