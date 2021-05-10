import { useState, createContext } from "react";

export const UserContext = createContext({});

export default function UserProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    savedCities: [
      {
        city: "Varanasi",
        country: "IN",
        latitude: 25.3176,
        longitude: 82.9739,
      },
      {
        city: "London",
        country: "UK",
        latitude: 51.5074,
        longitude: -0.1278,
      },
      {
        city: "Texas",
        country: "US",
        latitude: 31.9686,
        longitude: -99.9018,
      },
      {
        city: "Delhi",
        country: "IN",
        latitude: 28.7041,
        longitude: 77.1025,
      },
      {
        city: "Bangalore",
        country: "IN",
        latitude: 12.9716,
        longitude: 77.5946,
      },
    ],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
