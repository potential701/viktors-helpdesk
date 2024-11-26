import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {AxiosError} from "axios";

export function cn(...inputs: ClassValue[]){
  return twMerge(clsx(inputs))
}

type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>)['message'] === 'string'
  )
}

function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if(error instanceof AxiosError){
    return new Error(error?.response?.data.detail);
  }
  else if (isErrorWithMessage(error)) {
    return error as ErrorWithMessage
  }

  try {
    return new Error(JSON.stringify(error))
  } catch {
    // Fallback in case there's an error stringifying the
    // maybeError (for example, with circular references).
    return new Error(String(error))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}