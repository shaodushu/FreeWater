import "./loading.css";

function Loading() {
  return (
    <div className="page-loading-warp">
      <div className="ant-spin ant-spin-lg ant-spin-spinning">
        <span className="ant-spin-dot ant-spin-dot-spin">
          <i className="ant-spin-dot-item" />
          <i className="ant-spin-dot-item" />
          <i className="ant-spin-dot-item" />
          <i className="ant-spin-dot-item" />
        </span>
      </div>
    </div>
  );
}

export default Loading;
