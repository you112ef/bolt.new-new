"use client"
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AI_MODELS, AIModel } from '@/configs/AiModel';

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange?: (model: AIModel) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const handleModelChange = (modelId: string) => {
    const model = AI_MODELS.find(m => m.id === modelId);
    if (model && onModelChange) {
      onModelChange(model);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">AI Model:</label>
      <Select value={selectedModel.id} onValueChange={handleModelChange}>
        <SelectTrigger className="w-[280px] bg-white border-gray-300">
          <SelectValue placeholder="Select AI Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gemini-2.0-flash">
            <div className="flex flex-col">
              <span className="font-medium">Gemini 2.0 Flash</span>
              <span className="text-xs text-gray-500">Google • Free</span>
            </div>
          </SelectItem>
          <SelectItem value="gemini-1.5-pro">
            <div className="flex flex-col">
              <span className="font-medium">Gemini 1.5 Pro</span>
              <span className="text-xs text-gray-500">Google • Free</span>
            </div>
          </SelectItem>
          <SelectItem value="openai/gpt-4o">
            <div className="flex flex-col">
              <span className="font-medium">GPT-4o</span>
              <span className="text-xs text-gray-500">OpenAI • $5.00/1M tokens</span>
            </div>
          </SelectItem>
          <SelectItem value="openai/gpt-4o-mini">
            <div className="flex flex-col">
              <span className="font-medium">GPT-4o Mini</span>
              <span className="text-xs text-gray-500">OpenAI • $0.15/1M tokens</span>
            </div>
          </SelectItem>
          <SelectItem value="anthropic/claude-3.5-sonnet">
            <div className="flex flex-col">
              <span className="font-medium">Claude 3.5 Sonnet</span>
              <span className="text-xs text-gray-500">Anthropic • $3.00/1M tokens</span>
            </div>
          </SelectItem>
          <SelectItem value="anthropic/claude-3-haiku">
            <div className="flex flex-col">
              <span className="font-medium">Claude 3 Haiku</span>
              <span className="text-xs text-gray-500">Anthropic • $0.25/1M tokens</span>
            </div>
          </SelectItem>
          <SelectItem value="meta-llama/llama-3.1-405b-instruct">
            <div className="flex flex-col">
              <span className="font-medium">Llama 3.1 405B</span>
              <span className="text-xs text-gray-500">Meta • $2.70/1M tokens</span>
            </div>
          </SelectItem>
          <SelectItem value="meta-llama/llama-3.1-70b-instruct">
            <div className="flex flex-col">
              <span className="font-medium">Llama 3.1 70B</span>
              <span className="text-xs text-gray-500">Meta • $0.90/1M tokens</span>
            </div>
          </SelectItem>
          <SelectItem value="google/gemini-pro-1.5">
            <div className="flex flex-col">
              <span className="font-medium">Gemini Pro 1.5</span>
              <span className="text-xs text-gray-500">Google • $1.25/1M tokens</span>
            </div>
          </SelectItem>
          <SelectItem value="mistralai/mistral-7b-instruct">
            <div className="flex flex-col">
              <span className="font-medium">Mistral 7B</span>
              <span className="text-xs text-gray-500">Mistral • $0.20/1M tokens</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;