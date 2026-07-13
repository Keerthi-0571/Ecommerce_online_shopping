function Register() {
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Register</h2>

      <form>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>

        <button className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;