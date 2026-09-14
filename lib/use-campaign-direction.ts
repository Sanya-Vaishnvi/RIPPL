"use client";

import { useState } from "react";
import type { CampaignContent } from "./campaign-mock";
import type { ParsedRequest } from "./direction-types";
import { applyRequest } from "./apply-request";

interface PendingAlternatives {
  field: keyof CampaignContent;
  options: string[];
}

export function useCampaignDirection(
  territoryId: string,
  initialCampaign: CampaignContent
) {
  const [campaign, setCampaign] = useState<CampaignContent>(initialCampaign);
  const [previousCampaign, setPreviousCampaign] =
    useState<CampaignContent | null>(null);
  const [changedFields, setChangedFields] = useState<(keyof CampaignContent)[]>([]);
  const [lastRequestLabel, setLastRequestLabel] = useState<string | null>(null);
  const [pendingAlternatives, setPendingAlternatives] =
    useState<PendingAlternatives | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const hasPendingDiff = previousCampaign !== null;

  function runRequest(request: ParsedRequest, label: string) {
    setMessage(null);
    const result = applyRequest(territoryId, campaign, request);

    if (result.kind === "unavailable") {
      setMessage(result.message);
      return;
    }
    if (result.kind === "alternatives") {
      setPendingAlternatives({ field: result.field, options: result.options });
      return;
    }

    setPreviousCampaign(campaign);
    setCampaign(result.next);
    setChangedFields(result.changedFields);
    setLastRequestLabel(label);
  }

  function selectAlternative(field: keyof CampaignContent, value: string) {
    setPreviousCampaign(campaign);
    setCampaign({ ...campaign, [field]: value });
    setChangedFields([field]);
    setLastRequestLabel("Selected an alternative");
    setPendingAlternatives(null);
  }

  function keepChanges() {
    setPreviousCampaign(null);
    setChangedFields([]);
    setLastRequestLabel(null);
  }

  function revert() {
    if (previousCampaign) setCampaign(previousCampaign);
    setPreviousCampaign(null);
    setChangedFields([]);
    setLastRequestLabel(null);
  }

  function dismissAlternatives() {
    setPendingAlternatives(null);
  }

  function reportUnrecognized() {
    setMessage("I didn't recognize that direction.");
  }

  function clearMessage() {
    setMessage(null);
  }

  return {
    campaign,
    previousCampaign,
    changedFields,
    lastRequestLabel,
    hasPendingDiff,
    pendingAlternatives,
    message,
    runRequest,
    selectAlternative,
    keepChanges,
    revert,
    dismissAlternatives,
    reportUnrecognized,
    clearMessage,
  };
}