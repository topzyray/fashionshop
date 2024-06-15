"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loaders/ComponentLevelLoader";
import Notification from "@/components/Notification";
import { AddressFormData, GlobalContext } from "@/context/global-context";
import {
  addNewAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast, ToastPosition } from "react-toastify";

// type CurrentUpdateAddress = {
//   _id: string;
//   fullName: string;
//   address: string;
//   city: string;
//   country: string;
//   postalCode: string;
//   userId: string;
// };

export default function AccountPage() {
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [currentUpdateAddress, setCurrentUpdateAddress] =
    useState<AddressFormData | null>(null);
  const router = useRouter();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const fetchAllAddresses = async () => {
    if (user !== null) {
      const response = await getAllAddress(user?._id);
      if (response.success) {
        setAddresses(response.data);
        localStorage.setItem("addresses", JSON.stringify(response.data));
        toast.success(response.message, {
          position: "top-right" as ToastPosition,
        });
        setLoadingAddress(false);
      } else {
        toast.error(response.message, {
          position: "top-right" as ToastPosition,
        });
        setLoadingAddress(false);
      }
    }
  };

  useEffect(() => {
    if (user !== null) {
      fetchAllAddresses();
    }
  }, [user]);

  const handleAddOrUpdateAddress = async () => {
    if (user !== null) {
      setComponentLevelLoader({ loading: true, id: "" });
      const response =
        currentUpdateAddress !== null
          ? await updateAddress(addressFormData)
          : await addNewAddress({
              ...addressFormData,
              userId: user?._id,
            });
      if (response.success) {
        setComponentLevelLoader({ loading: false, id: "" });
        toast.success(response.message, {
          position: "top-right" as ToastPosition,
        });
        setAddressFormData({
          fullName: "",
          address: "",
          city: "",
          country: "",
          postalCode: "",
          userId: "",
        });
        setCurrentUpdateAddress(null);
        fetchAllAddresses();
        setShowAddressForm(false);
      } else {
        toast.error(response.message, {
          position: "top-right" as ToastPosition,
        });
        setAddressFormData({
          fullName: "",
          address: "",
          city: "",
          country: "",
          postalCode: "",
          userId: "",
        });
        setComponentLevelLoader({ loading: false, id: "" });
      }
    }
  };

  const handleDeleteAdress = async (addressId: string) => {
    if (user !== null) {
      setComponentLevelLoader({ loading: true, id: addressId });
      const response = await deleteAddress(addressId);
      console.log(response);
      if (response.success) {
        setComponentLevelLoader({ loading: false, id: "" });
        toast.success(response.message, {
          position: "top-right" as ToastPosition,
        });
        fetchAllAddresses();
      } else {
        toast.error(response.message, {
          position: "top-right" as ToastPosition,
        });
        setComponentLevelLoader({ loading: false, id: "" });
      }
    }
  };

  useEffect(() => {
    if (currentUpdateAddress !== null) {
      setAddressFormData(currentUpdateAddress);
    }
  }, [currentUpdateAddress]);

  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div>
              <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                {/* For rendering user random image */}
              </div>

              <div className="flex flex-col flex-1">
                <h4 className="text-lg font-semibold text-center md:text-left">
                  {user?.name}
                </h4>
                <p className="text-sm text-center md:text-left">
                  {user && user?.email}
                </p>
                <p className="text-sm text-center md:text-left">
                  {user && user?.role}
                  {/* {user &&
                    user?.role.slice(0, 1).toUpperCase() +
                      user?.role.slice(1).toLowerCase()} */}
                </p>
              </div>
              <button
                onClick={() => router.push("/orders")}
                type="button"
                className="btn-small mt-5"
              >
                View Your Orders
              </button>
            </div>
            <div className="mt-6">
              <h1 className="font-bold text-lg">Your Addresses:</h1>
              {loadingAddress ? (
                <div className="flex items-center">
                  <PulseLoader
                    color={"#1D2939"}
                    loading={loadingAddress}
                    size={10}
                    data-testid="loader"
                  />
                </div>
              ) : (
                <div className="mt-4 max-w-sm flex flex-col gap-4">
                  {addresses && addresses.length ? (
                    addresses.map((address) => (
                      <div key={address._id} className="border p-6">
                        <p>Name: {address.fullName}</p>
                        <p>Address: {address.address}</p>
                        <p>City: {address.city}</p>
                        <p>Country: {address.country}</p>
                        <p>PostalCode: {address.postalCode}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowAddressForm(true);
                              setCurrentUpdateAddress(address);
                            }}
                            type="button"
                            className="btn-small mt-5"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteAdress(address._id)}
                            type="button"
                            className="btn-small bg-red-700 mt-5"
                          >
                            {componentLevelLoader &&
                            componentLevelLoader.loading &&
                            componentLevelLoader.id === address._id ? (
                              <ComponentLevelLoader
                                text="Deleting"
                                color="#ffffff"
                                loading={
                                  componentLevelLoader &&
                                  componentLevelLoader.loading
                                }
                              />
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No address found. Please add your address.</p>
                  )}
                </div>
              )}
            </div>
            <div>
              <div className="mt-4">
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  type="button"
                  className="btn-small mt-5"
                >
                  {showAddressForm ? "Hide Address Form" : "Add New Address"}
                </button>
              </div>
              {showAddressForm && showAddressForm && (
                <div className="max-w-sm flex flex-col mt-5 justify-center pt-4 items-center">
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                    {addNewAddressFormControls.map((formItem) => (
                      <InputComponent
                        key={formItem.id}
                        type={formItem.type}
                        placeholder={formItem.placeholder}
                        label={formItem.label}
                        value={addressFormData[formItem.id]}
                        onChange={(e) =>
                          setAddressFormData({
                            ...addressFormData,
                            [formItem.id]: e.target.value,
                          })
                        }
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleAddOrUpdateAddress}
                    type="button"
                    className="btn-small mt-5"
                  >
                    {componentLevelLoader &&
                    componentLevelLoader.loading &&
                    componentLevelLoader.id === "" ? (
                      <ComponentLevelLoader
                        text={
                          currentUpdateAddress
                            ? "Updating address"
                            : "Adding Address"
                        }
                        color="#ffffff"
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : currentUpdateAddress ? (
                      "Update address"
                    ) : (
                      "Add Address"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
