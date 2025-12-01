import { EmergencyCall, DisasterMessage } from './types';

// Simulated subset of: https://www.kaggle.com/datasets/mchirico/montcoalert
export const MOCK_911_DATA: EmergencyCall[] = [
  { lat: 40.297, lng: -75.581, desc: "REINDEER CT & DEAD END;  NEW HANOVER; Station 332; 2015-12-10 @ 17:10:52;", zip: "19525", title: "EMS: BACK PAINS/INJURY", timeStamp: "2024-05-20 17:10:52", twp: "NEW HANOVER", addr: "REINDEER CT & DEAD END", e: 1, title_p: "EMS" },
  { lat: 40.258, lng: -75.264, desc: "BRIAR PATH & WHITEMARSH LN;  HATFIELD TOWNSHIP; Station 345; 2015-12-10 @ 17:29:21;", zip: "19446", title: "EMS: DIABETIC EMERGENCY", timeStamp: "2024-05-20 17:29:21", twp: "HATFIELD TOWNSHIP", addr: "BRIAR PATH & WHITEMARSH LN", e: 1, title_p: "EMS" },
  { lat: 40.121, lng: -75.351, desc: "HAWS AVE; NORRISTOWN; 2015-12-10 @ 14:39:21-Station:STA27;", zip: "19401", title: "Fire: GAS-ODOR/LEAK", timeStamp: "2024-05-20 14:39:21", twp: "NORRISTOWN", addr: "HAWS AVE", e: 1, title_p: "Fire" },
  { lat: 40.116, lng: -75.343, desc: "AIRY ST & SWEDE ST;  NORRISTOWN; Station 308A; 2015-12-10 @ 16:47:36;", zip: "19401", title: "EMS: CARDIAC EMERGENCY", timeStamp: "2024-05-20 16:47:36", twp: "NORRISTOWN", addr: "AIRY ST & SWEDE ST", e: 1, title_p: "EMS" },
  { lat: 40.251, lng: -75.603, desc: "CHERRYWOOD CT & DEAD END;  LOWER POTTSGROVE; Station 329; 2015-12-10 @ 16:56:52;", zip: "19464", title: "EMS: DIZZINESS", timeStamp: "2024-05-20 16:56:52", twp: "LOWER POTTSGROVE", addr: "CHERRYWOOD CT & DEAD END", e: 1, title_p: "EMS" },
  { lat: 40.253, lng: -75.248, desc: "CHURCH RD & REDTAIL RD;  UPPER GWYNEDD; Station 345; 2015-12-10 @ 16:30:00;", zip: "19034", title: "Traffic: VEHICLE ACCIDENT -", timeStamp: "2024-05-20 16:30:00", twp: "UPPER GWYNEDD", addr: "CHURCH RD & REDTAIL RD", e: 1, title_p: "Traffic" },
  { lat: 40.253, lng: -75.249, desc: "CHURCH RD & REDTAIL RD;  UPPER GWYNEDD; Station 345; 2015-12-10 @ 16:32:00;", zip: "19034", title: "EMS: RESPIRATORY EMERGENCY", timeStamp: "2024-05-20 16:32:00", twp: "UPPER GWYNEDD", addr: "CHURCH RD & REDTAIL RD", e: 1, title_p: "EMS" },
];

// Simulated subset of: https://www.kaggle.com/datasets/landlord/multilingual-disaster-response-messages
export const MOCK_DISASTER_MESSAGES: DisasterMessage[] = [
  { id: "202", message: "Help! Water rising in Norristown, trapped on second floor.", original: "Aide! L'eau monte...", genre: "direct", related: 1, request_offer: "request" },
  { id: "203", message: "Need food and water in Hatfield. Power is out.", original: "", genre: "direct", related: 1, request_offer: "request" },
  { id: "204", message: "Traffic is blocked on 422 Eastbound due to flooding.", original: "", genre: "social", related: 1, request_offer: "none" },
  { id: "205", message: "I have 100 blankets available at the community center in 19464.", original: "", genre: "direct", related: 1, request_offer: "offer" },
  { id: "206", message: "My grandmother in 19034 is having chest pains and we can't get out.", original: "", genre: "social", related: 1, request_offer: "request" },
];