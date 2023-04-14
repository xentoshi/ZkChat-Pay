import { RLNFullProof } from 'rlnjs'
import { useState } from 'react'

export type PublishQueueType = {
    message: string
    proof: RLNFullProof
}

// Getters & Setters for all RLNjs objects
export const useEpoch = (initialValue: BigInt) => {
  const [epoch, setEpoch] = useState(initialValue);
  return [epoch, setEpoch];
}

export const useAppID = (initialValue: BigInt) => {
  const [appID, setAppID] = useState(initialValue);
  return [appID, setAppID];
}

export const usePublishQueue = (initialValue: PublishQueueType[]) => {
  const [publishQueue, setPublishQueue] = useState(initialValue);
  return [publishQueue, setPublishQueue];
}

export const usePublishedMsgProofs = (initialValue: PublishQueueType[]) => {
  const [publishedMsgProofs, setPublishedMsgProofs] = useState(initialValue);
  return [publishedMsgProofs, setPublishedMsgProofs];
}
