import { useConvex as useConvexOriginal, useMutation as useMutationOriginal } from 'convex/react';

// Safe hooks that work even when Convex is not available
export function useConvexSafe() {
  try {
    return useConvexOriginal();
  } catch (error) {
    console.warn("Convex not available:", error);
    return null;
  }
}

export function useMutationSafe(mutation: any) {
  try {
    return useMutationOriginal(mutation);
  } catch (error) {
    console.warn("Convex mutation not available:", error);
    return null;
  }
}

// Specific hooks for the app
export function useUpdateMessagesSafe() {
  try {
    const { api } = require('../../convex/_generated/api');
    return useMutationSafe(api.workspace.UpdateMessages);
  } catch (error) {
    console.warn("Convex API not available:", error);
    return null;
  }
}

export function useUpdateFilesSafe() {
  try {
    const { api } = require('../../convex/_generated/api');
    return useMutationSafe(api.workspace.UpdateFiles);
  } catch (error) {
    console.warn("Convex API not available:", error);
    return null;
  }
}