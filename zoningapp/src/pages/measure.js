import React from 'react'
import { useStore } from '../state'
import ToggleSubject from '../components/forms/togglesubject'
import SiteUtilization from '../components/graphic/siteutilization'
import Instructions from '../components/instructions'
import Table from '../components/table'
import { formatDim, formatNum } from '../utils/format'

const instructions = `Toggle sites/scenarios to preview floor area, \
  unit counts and parking.`

export default () => {
  const currentSite = useStore(state => state.currentSite)
  const assumptions = useStore(state => state.assumptions)

  let dims, counts, bikeparking, parking, loading = {}
  if (currentSite.Scenarios){
    const {
      Dims: { 
        HeightFromBasePlane, 
        BasePlaneElevation, 
        Frontage,
      },
      Counts: {
        ResidentialUnits,
        HotelRooms,
      },
      ParkingRequired: {
        SpacesTotal: ParkingSpacesTotal,
        Area: ParkingAreaTotal,
      },
      LoadingRequired: {
        SpacesTotal: LoadingSpacesTotal,
        Area: LoadingAreaTotal,
      },
      BikeParkingRequired: {
        SpacesTotal: BikeParkingSpacesTotal,
        Area: BikeParkingAreaTotal,
      },
      GFA: {
        Parking,
        Loading,
        BikeParking,
      },
      ZoningLot: {
        Area: ZoningLotArea,
      }
    } = currentSite

    const {
      HOTELROOMAREA,
      RESIDENTIALUNITAREA,
      PARKINGSPACEAREA,
      LOADINGSPACEAREA,
      BIKEPARKINGSPACEAREA,
    } = assumptions

    dims = {
      'Height': formatDim(HeightFromBasePlane) + "'",
      'Elevation': formatDim(BasePlaneElevation) + "'",
      'Frontage': formatDim(Frontage) + "'",
      'Zoning Lot Area': formatNum(ZoningLotArea),
    }

    counts = {
      'Hotel Rooms': HotelRooms,
      'Residential Units': ResidentialUnits,
    }

    parking = {
      head: ['Parking', 'Required', 'Provided'],
      body: [
        ['Area', formatNum(ParkingAreaTotal), formatNum(Parking)],
        ['Spaces', ParkingSpacesTotal,  Math.floor(Parking / PARKINGSPACEAREA)]
      ]
    }

    bikeparking = {
      head: ['Bike Parking', 'Required', 'Provided'],
      body: [
        ['Area', formatNum(BikeParkingAreaTotal), formatNum(BikeParking)],
        ['Spaces', BikeParkingSpacesTotal,  Math.floor(BikeParking / BIKEPARKINGSPACEAREA)]
      ]
    }

    loading = {
      head: ['Loading', 'Required', 'Provided'],
      body: [
        ['Area', formatNum(LoadingAreaTotal), formatNum(Loading)],
        ['Spaces', LoadingSpacesTotal,  Math.floor(Loading / LOADINGSPACEAREA)]
      ]
    }
  }

  return (
    <>
      <ToggleSubject />
      <Instructions text={instructions} />
      <SiteUtilization />
      <Table label='Dimensions' dict={dims} />
      <Table label='Unit Counts' dict={counts} />
      <Table labelFirstOnly table={parking} />
      <Table labelFirstOnly table={loading} />
      <Table labelFirstOnly table={bikeparking} />
    </>
  )
}
