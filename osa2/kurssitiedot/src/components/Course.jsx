const Header = ({ course }) => <h1>{ course }</h1>

const Total = ({ sum }) => <p><strong>total of { sum } exercises</strong></p>

const Part = ({ part }) => 
  <p>
    { part.name } { part.exercises }
  </p>

const Content = ({ parts }) => {
  const partElems = parts.map((part) => (
    <Part key={ part.id } part={ part }/>
  ))

  return (
    <>
      { partElems }    
    </>
  )
}

const Course = ({ course }) => {
  const sum = course.parts.reduce((a, b) => a + (b.exercises || 0), 0);

  return (
    <>
      <Header course={ course.name } />
      <Content parts={ course.parts } />
      <Total sum={ sum } />    
    </>
  )
}

export default Course