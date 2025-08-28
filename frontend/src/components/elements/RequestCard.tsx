import { ChartAreaIcon, CheckCircleIcon, ShoppingCartIcon, TruckIcon } from "lucide-react";
import type { Request, RequestDonation } from "../../lib/Types";

const RequestCard = ({
  request,
  action = false,
}: {
  request: Request;
  action?: boolean;
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "WAITING":
        return <ShoppingCartIcon className="h-5 w-5 text-yellow-500" />;
      case "PENDING":
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      case "DELIVERED":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "CANCELED":
        return <CheckCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ShoppingCartIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "WAITING":
        return "yellow-500";
      case "PENDING":
        return "blue-500";
      case "DELIVERED":
        return "green-500";
      case "CANCELED":
        return "red-500";
      default:
        return "gray-500";
    }
  };

  return (
    <div className="w-full border-b border-b-gray-200 relative">
      <div className="px-4 py-5 sm:px-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {getStatusIcon(request.status)}
            <p className="text-sm font-medium ml-2 text-gray-900">
              Request #{request.id}
            </p>
          </div>
          <div className="ml-2 flex-shrink-0">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getStatusColor(
                request.status
              )}`}
            >
              {request.status}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Requested:</span>{" "}
            {request.createdAt.slice(0, 10)}
          </p>
          {/* {request.pickupDate && (
                              <p className="text-sm text-gray-500">
                                <span className="font-medium">
                                  Pickup Date:
                                </span>{" "}
                                {formatDate(request.pickupDate)}
                              </p>
                            )}
                            {request.deliveryDate && (
                              <p className="text-sm text-gray-500">
                                <span className="font-medium">
                                  Delivery Date:
                                </span>{" "}
                                {formatDate(request.deliveryDate)}
                              </p>
                            )} */}
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Items:</span>{" "}
            {request.requestDonations.length} items
          </p>
          <div className="text-sm text-gray-500 mt-1 line-clamp-2">
            {request.requestDonations.map(
              (requestDonation: RequestDonation, i) => {
                return (
                  <div key={i}>
                    <h2>
                      {requestDonation.donation.name} ({" "}
                      {requestDonation.donation.quantity}{" "}
                      {requestDonation.donation.unit} )
                    </h2>
                  </div>
                );
              }
            )}
          </div>
        </div>
        {/* {driver && (
                            <div className="mt-2 border-t border-gray-200 pt-2">
                              <p className="text-sm font-medium text-gray-900">
                                Driver Information
                              </p>
                              <p className="text-sm text-gray-500">
                                {driver.name}{" "}
                                {driver.phone && `• ${driver.phone}`}
                              </p>
                            </div>
                          )} */}
      </div>
      <div className="absolute bottom-3 right-3 text-xs">
        <div className="flex items-center justify-center">
          <button className="text-white px-4 py-2 rounded-lg bg-blue-500 font-semibold hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-4">
            <TruckIcon className="h-6 w-6 text-white" />
            <span>Mark this request</span>
          </button>
          <button className="text-[#121212] px-4 py-2 rounded-lg bg-white font-semibold hover:bg-[#F9FAFB] cursor-pointer ml-5 flex items-center gap-4 border">
            {/* <Message className="h-6 w-6" /> */}
            <span>Chat With NGO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
