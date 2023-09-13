const LoadingComponent = () => {
    const styles = {
      borderRadius: '0.475rem',
      boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
      backgroundColor: '#fff',
      color: '#7e8299',
      fontWeight: '500',
      margin: '0',
      width: 'auto',
      padding: '1rem 2rem',
      top: 'calc(50% - 2rem)',
      left: 'calc(50% - 4rem)',
    }
  
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 9999}}>
        <div style={{...styles, position: 'absolute', textAlign: 'center'}}>Processing...</div>
      </div>)
}

export { LoadingComponent }