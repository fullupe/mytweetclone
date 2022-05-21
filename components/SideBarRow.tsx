import React,{SVGProps} from 'react'

interface Props{ 
  Icon: (props: SVGProps<SVGSVGElement>)=>JSX.Element,
  title: string
  onClick?:()=>{}

}

function SideBarRow({Icon,title,onClick}:Props) {
  return (
    <div onClick={()=>onClick?.()} className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full transition-all duration-200 hover:bg-gray-100 group">
      <Icon className="w-6 h-6"/>
      <p className="group-hover:text-twittercolor text-base font-light lg:text-xl hidden md:inline-flex">{title}</p>


    </div>
  )
}

export default SideBarRow;
