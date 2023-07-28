import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassowrd() {
  const navigate: any = useNavigate()
  const { id } = useParams()

  const handleNavigation = () => {
    navigate('/')
  }
  return (
    <div className="signin_page forgot_password_Page">
      <Container>
        <div className="signin_Box mx-auto">
          <div className="login_heading">
            <h1>Check Your inbox</h1>
          </div>
          <span>We just emailed instructions and a reset</span>
          <span>password link to {id}</span>
          <span>it might take a few minutes to arrive.</span>
          <div className="text-center mt-5">
            <button
              type="submit"
              className="login_btn"
              onClick={handleNavigation}
            >
              {' '}
              Back to sign-in
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ResetPassowrd
