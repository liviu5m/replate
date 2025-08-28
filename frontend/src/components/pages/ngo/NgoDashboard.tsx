import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../../lib/AppContext";
import { getAllDonations } from "../../../api/donation";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  CheckCircleIcon,
  PackageIcon,
  PlusIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react";
import type { Donation, Request, RequestDonation } from "../../../lib/Types";
import DonationCard from "../../elements/donor/DonationCard";
import { getAllRequests } from "../../../api/request";

const NgoDashboard = () => {
  const { user, token } = useAppContext();

  const { data, isPending } = useQuery({
    queryKey: ["donations"],
    queryFn: () =>
      getAllDonations(user?.id || -1, token || "", "AVAILABLE", ""),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const { data: requestsData, isPending: isPendingRequestsData } = useQuery({
    queryKey: ["request"],
    queryFn: () => getAllRequests(user?.id || -1, token || "", "all"),
    refetchOnWindowFocus: false,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

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
    <div className="flex items-center justify-center bg-white">
      <div className="container">
        <DashboardLayout>
          <div className="flex items-center justify-between p-5 bg-white border-b border-b-gray-400 h-20">
            <h1 className="font-semibold text-lg">NGO Dashboard</h1>
            <Link
              to={"/"}
              className="flex items-center justify-center gap-3 font-semibold"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Back</span>
            </Link>
          </div>
          <div className="m-10 p-8 rounded-lg bg-white shadow">
            <h1 className="text-xl font-bold mb-3">
              Welcome, {user?.fullName} !
            </h1>
            <p className="text-gray-400">
              Find available food donations and track your collection requests.
            </p>
          </div>
          <div className="m-10 p-8 rounded-lg bg-[#EFF6FF] shadow">
            <h1 className="text-blue-500 text-xl font-semibold">
              Quick Actions
            </h1>
            <div className="mt-5 flex">
              <Link
                to={"/ngo/available-food"}
                className="text-white px-8 py-3 rounded-lg bg-blue-500 text-sm font-semibold hover:bg-blue-600 cursor-pointer flex items-center gap-4 border"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Browse Available Food</span>
              </Link>
              <Link
                to={"/ngo/my-requests"}
                className="text-[#121212] px-8 py-3 rounded-lg bg-white text-sm font-semibold hover:bg-[#F9FAFB] cursor-pointer ml-5 flex items-center gap-4 border"
              >
                <TruckIcon className="h-5 w-5" />
                <span>View My Requests</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 m-10">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <PackageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Available Food
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {data
                          ? data.filter(
                              (donation: Donation) =>
                                donation.status == "AVAILABLE"
                            ).length
                          : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <ShoppingCartIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Waiting
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {requestsData
                          ? requestsData.filter(
                              (request: Request) => request.status == "WAITING"
                            ).length
                          : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <TruckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {requestsData
                          ? requestsData.filter(
                              (request: Request) => request.status == "PENDING"
                            ).length
                          : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Delivered
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {requestsData
                          ? requestsData.filter(
                              (request: Request) =>
                                request.status == "DELIVERED"
                            ).length
                          : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg m-10">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Available food items
              </h3>
              <Link
                to="/ngo/available-food"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="p-4 w-full">
              {data && data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.slice(0, 4).map((donation: Donation, i: number) => {
                    return (
                      <DonationCard donation={donation} key={i} role="ngo" />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No food available found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Wait for other donations.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg m-10">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">My Requests</h3>
              <Link
                to="/donor/donations"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="p-4 w-full">
              {isPendingRequestsData ? (
                <div className="flex items-center justify-center">
                  <div className="w-30 h-30 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div>
                  {requestsData && requestsData.length > 0 ? (
                    <div className="flex flex-col bg-white rounded-lg shadow">
                      {requestsData.map((request: Request, i: number) => {
                        return (
                          <div
                            key={i}
                            className="w-full border-b border-b-gray-200"
                          >
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
                                  <span className="font-medium">
                                    Requested:
                                  </span>{" "}
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
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="m-10 p-8 rounded-lg bg-white shadow flex items-center justify-between flex-col gap-3">
                      <PackageIcon className="h-20 w-20 text-gray-400" />
                      <h2 className="font-semibold text-sm">
                        No donations found
                      </h2>
                      <p className="text-gray-400 text-sm">
                        You haven't made any donations yet.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default NgoDashboard;
