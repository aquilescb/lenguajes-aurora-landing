import emailjs from "@emailjs/browser";

type ReservationEmailPayload = {
   to_email: string;
   to_name: string;
   hotel_name: string;
   reservation_id: string | number;
   room_label: string;
   room_number: string;
   checkin_date: string;
   checkout_date: string;
};

export async function sendReservationEmail(payload: ReservationEmailPayload) {
   const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
   const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

   emailjs.init(publicKey);
   return emailjs.send(serviceId, templateId, payload);
}
