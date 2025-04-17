// hooks/useCountdown.ts
import { useState, useEffect } from 'react';

export interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isExpired: boolean;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
	const now = new Date();
	const difference = targetDate.getTime() - now.getTime();

	if (difference <= 0) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
	}

	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((difference % (1000 * 60)) / 1000);

	return { days, hours, minutes, seconds, isExpired: false };
};

const useCountdown = (targetDate: Date): TimeLeft => {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
		calculateTimeLeft(targetDate)
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft(targetDate));
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	return timeLeft;
};

export default useCountdown;
