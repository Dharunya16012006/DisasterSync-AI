export interface EmergencyCall {
  lat: number;
  lng: number;
  desc: string;
  zip: string;
  title: string;
  timeStamp: string;
  twp: string;
  addr: string;
  e: number;
  title_p: 'EMS' | 'Fire' | 'Traffic';
}

export interface DisasterMessage {
  id: string;
  message: string;
  original: string;
  genre: 'direct' | 'social' | 'news';
  related: number; // 1 = relevant, 0 = not
  request_offer: 'request' | 'offer' | 'none';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AgentState {
  isThinking: boolean;
  currentAgent: 'EMS_ANALYZER' | 'CITIZEN_ANALYZER' | 'LOGISTICS_AGENT' | 'COMMUNICATION_AGENT' | 'IDLE';
}