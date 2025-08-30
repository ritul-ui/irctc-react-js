import { createSlice } from "@reduxjs/toolkit";

const trainSlice = createSlice({
  name: "train",
  initialState: {
    trains: [
      {
        train_number: "12345",
        train_name: "Rajdhani Express",
        departure_time: "06:00",
        arrival_time: "18:00",
        source: "Delhi",
        destination: "Mumbai",
        days_of_operation: ["Mon", "Wed", "Fri"],
        price: { "1A": 3500, "2A": 2200, "3A": 1500 },
      },
      {
        train_number: "54321",
        train_name: "Shatabdi Express",
        departure_time: "08:30",
        arrival_time: "16:30",
        source: "Delhi",
        destination: "Chandigarh",
        days_of_operation: ["Tue", "Thu", "Sat"],
        price: { CC: 1200, "2S": 600 },
      },
      {
        train_number: "67890",
        train_name: "Special Superfast",
        departure_time: "22:00",
        arrival_time: "06:00",
        source: "Mumbai",
        destination: "Chennai",
        days_of_operation: "Daily",
        price: { "1A": 4000, "2A": 2500, "3A": 1700, SL: 800 },
      },
    ],
    filteredTrains: [],

    loading: false,
    errors: null,

    searchParams: {
      to: "",
      from: "",
      travelClass: "",
      quota: "",
    },

    filters: {
      travelClass: {},
      trainType: {},
      departureTime: {},
    },
  },

  reducers: {
    setSearchParams: (state, action) => {
      // console.log("seetitng search parms");
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    resetSearchParams: (state, action) => {
      state.searchParams = {
        from: "",
        to: "",
        date: "",
        travelClass: "",
        quota: "",
      };
    },
    applyFilters :(state, action) => {
      console.log("existing filet", JSON.stringify(state.filters));
console.log("existing params", JSON.stringify(state.searchParams));

// let filtered = [];
 let filtered = [...state.trains];
// state.filteredTrains = [...state.trains];
console.log("state from", state.searchParams.to);
if(state.searchParams.to && state.searchParams.from){
filtered = filtered.filter((train) => {
  return train.source.toLowerCase() === state.searchParams.from.toLowerCase() && train.destination.toLowerCase() === state.searchParams.to.toLowerCase();
});
}
console.log("after from to filter", JSON.stringify(filtered));
if(state.searchParams.travelClass){

}

if(state.searchParams.quota){

}
state.filteredTrains = filtered;

    }
    // setFilters: (state, action) => {},
    // resetFilters: (state, action) => {},

    //to do write a simple filter function to filter out the trains with applicable  filters and populate  the filterred array
  },
});

export const { setSearchParams, resetSearchParams, applyFilters } = trainSlice.actions;
export default trainSlice.reducer;
