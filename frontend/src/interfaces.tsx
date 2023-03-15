import React from "react";

export interface Data {
  name: string;
  sun?: boolean;
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  custom?: string;
  start_time: string;
  end_time: string | undefined;
  location: string;
  info: string;
  website: string;
}

export interface NewData {
  id?: number;
  name: string;
  days: string;
  start_time: string;
  end_time: string | null;
  location: string;
  info: string;
  website: string;
}
