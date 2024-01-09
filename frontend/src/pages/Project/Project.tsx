import React from 'react'
import ProjectSidebar from './ProjectSidebar'

function Project() {
  return (
    <div className="projectIndex flex">
      <ProjectSidebar />
      <div className="projectIndex flex" >
        Body
      </div>

    </div>
  )
}

export default Project