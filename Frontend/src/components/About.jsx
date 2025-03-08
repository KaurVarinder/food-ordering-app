import aboutImage from "../assets/images/aboutUs.jpg"

const About = () => {
  return (
    <div id ="about" className="bg-white">
        <div className="p-6 md:p-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="">
                <h2 className="text-2xl font-medium">
                    About Us
                </h2>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium doloribus non, ut pariatur dolores fugiat eveniet ab impedit a ipsam consequuntur sed blanditiis reiciendis optio dolorum iste assumenda dolore vitae recusandae? Suscipit eligendi ut necessitatibus, delectus quae, ad accusantium obcaecati, placeat reiciendis consequatur aperiam libero excepturi ex. Qui recusandae culpa quos sequi quo assumenda magni corporis iste soluta reprehenderit, ut consequuntur. Aliquid nulla odio tenetur expedita sapiente velit, itaque ducimus ullam porro. Odio dolore, possimus eum quas nisi aut ducimus expedita harum fuga aspernatur necessitatibus delectus sed debitis provident facilis velit excepturi reiciendis, tenetur eveniet iure culpa. Numquam, esse repellendus.
                </p>
            </div>
            <div className="flex items-center justify-center">
                <img src={aboutImage} alt="About Us" className="w-full max-w-xs sm:max-w-sm md:w-[400px] md:h-[400px] object-cover rounded-lg" />
            </div>
        </div>
      
    </div>
  )
}

export default About
