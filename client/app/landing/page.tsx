'use client'
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";


export default function Main() {
    const handleCheckout = async () => {
        try {

            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('Authentication token not found');
                window.location.href = '/login';

            }
            else {
                window.location.href = '/checkout';
            }
        } catch (error) {
            console.error('Error :', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-8 text-center">Welcome to E Mart</h1>
                <p className="text-lg text-gray-600 mb-8 text-center p-2">
                    Experience the ease of our counterless payment system.
                </p>
                <Button size='lg' className="hover:bg-orange-600 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out" onClick={handleCheckout}>
                    Begin Checkout
                </Button>
            </main>
        </div>

    );
}
