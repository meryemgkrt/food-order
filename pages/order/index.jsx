import Image from "next/image";

const Order = () => {
  return (
    <div className="overflow-x-auto">
      <div className="min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10 min-w-[1000px]">
        <div className="flex items-center flex-1 w-full max-h-28">
          <table className="w-full text-sm text-center text-gray-500">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ORDER ID
                </th>
                <th scope="col" className="py-3 px-6">
                  CUSTOMER
                </th>
                <th scope="col" className="py-3 px-6">
                  ADDRESS
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary ">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                  123407f5559...
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  MERYEM KURT
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  ANKARA, TURKEY
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  $44
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between w-full p-10 bg-primary mt-6">
          <div className="relative flex flex-col items-center">
            <Image
              src="/image/paid.png"
              alt="Payment"
              width={40}
              height={40}
              className="object-contain"
            />
            <span>Payment</span>
          </div>
          <div className="relative flex flex-col items-center animate-pulse">
            <Image
              src="/image/bake.png"
              alt="Preparing"
              width={40}
              height={40}
              className="object-contain"
            />
            <span>Preparing</span>
          </div>
          <div className="relative flex flex-col items-center">
            <Image
              src="/image/bike.png"
              alt="On the way"
              width={40}
              height={40}
              className="object-contain"
            />
            <span>On the way</span>
          </div>
          <div className="relative flex flex-col items-center">
            <Image
              src="/image/delivered.png"
              alt="Delivered"
              width={40}
              height={40}
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
