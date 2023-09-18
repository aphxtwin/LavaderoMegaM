import React from 'react'
import {Card,CardContent,Skeleton} from '@mui/material'
export default function SkeletonAddCar() {
  return (
    <Card>
        <CardContent>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
        </CardContent>
  </Card>
  )
}
