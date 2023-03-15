import React from "react";

export interface Data {
  id?: string;
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
  end_time: undefined | string;
  location: string;
  information?: string;
  website?: string;
}
