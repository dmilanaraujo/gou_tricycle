// 'use client'
//
// import { Card, CardContent } from "@/components/ui/card"
// import { HeartIcon, StarIcon } from "lucide-react"
// import Image from "next/image"
// import {Business} from "@/types/business";
//
// type Props = {
//     images: string
//     name: string
//     rating: number
//     reviews: number
//     deliveryTime: string
//     deliveryFee?: string
// }
//
// export function SearchResultCard(business: Business) {
//     return (
//         <Card className="w-full max-w-sm rounded-xl overflow-hidden shadow-none hover:shadow-md hover:cursor-pointer transition">
//             <div className="relative w-full h-36">
//                 <Image
//                     src={images}
//                     alt={name}
//                     fill
//                     className="object-cover"
//                 />
//                 {/* Save badge */}
//                 <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
//                     Save
//                 </div>
//             </div>
//
//             <CardContent className="p-4">
//                 <div className="flex justify-between items-start">
//                     <div className="space-y-0.5">
//                         <h3 className="text-base font-semibold leading-tight">{name}</h3>
//                         {deliveryFee && <p className="text-sm text-muted-foreground">{deliveryFee}</p>}
//                         <p className="text-sm text-muted-foreground">
//               <span className="flex items-center gap-1">
//                 <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500" />
//                   {rating} ({reviews}+)&nbsp;•&nbsp;{deliveryTime}
//               </span>
//                         </p>
//                     </div>
//
//                     {/* Like icon */}
//                     <HeartIcon className="w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer mt-1" />
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }
