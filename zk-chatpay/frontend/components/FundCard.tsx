import { Badge, Box, Center, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface FundCardProps {
  title: string;
  description: string;
  image: string;
  isFunded?: boolean;
  nameOfProject: string;
  location: string;
  fundingNeeds: number;
  room: number;
}

const FundCard = ({
  title,
  description,
  image,
  isFunded,
  nameOfProject,
  location,
  fundingNeeds,
  room,
}: FundCardProps) => {
  return (
    <Box
    className="border border-gray-200 bg-white bg-opacity-60 bg-clip-padding shadow-lg hover:scale-105 sm:rounded-3xl sm:p-6 cursor-pointer"
    maxW={{ base: 'sm', md: 'lg' }}
    maxH="md"
  >
        <Image
          src={image}
          alt={title}
          className="aspect-square h-50 w-full rounded-md object-cover"
        />

        {isFunded && (
          <Box px={10} pt={10}>
            <Center>
              <Badge variant="solid" colorScheme="green">
                IsFunded
              </Badge>
            </Center>
          </Box>
        )}

        <Box p={10} className="text-center text-black">
          <Text fontWeight={500}>{title}</Text>
          <Text fontSize="sm" fontWeight={400}>
            {description}
          </Text>
          <Text>Name of Project: {nameOfProject}</Text>
          <Text>Purpose: {location}</Text>
          <Text>Estimated Funding Needs in ETH: {fundingNeeds}</Text>
          <Text>Room No: {room}</Text>
        </Box>
      </Box>
  );
};

export default FundCard;
