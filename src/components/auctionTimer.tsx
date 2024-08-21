import { useEffect, useState } from "react";

type Timer = {
  endTime: bigint;
  div1class: string;
  TimeBoxClass: string;
  dayClass: string;
  hourClass: string;
  minuteClass: string;
  secondsClass: string;
};
export default function AuctionTimer({
  endTime,
  div1class,
  TimeBoxClass,
  dayClass,
  hourClass,
  minuteClass,
  secondsClass,
}: Timer) {
  const calculateTimeLeft = () => {
    const endTimeDate = new Date(Number(endTime) * 1000).getTime();
    const now = new Date().getTime();
    const distance = endTimeDate - now;

    if (distance < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={div1class}>
      {timeLeft.expired ? (
        <p className=" text-[16px] ">Auction ended</p>
      ) : (
        <div className="flex flex-col">
          <div className="text-[16px]  font-extralight"> Aution ending in</div>
          <div className={TimeBoxClass}>
            <div className={dayClass}>{timeLeft.days}d</div>
            <div className={hourClass}>{timeLeft.hours}h</div>
            <div className={minuteClass}> {timeLeft.minutes}m</div>
            <div className={secondsClass}> {timeLeft.seconds}s </div>
          </div>
        </div>
      )}
    </div>
  );
}
