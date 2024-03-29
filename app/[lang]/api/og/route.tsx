import { ImageResponse } from "@vercel/og";

export const runtime = "experimental-edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return new ImageResponse(<>Provide a &quot;from&quot; location and &quot;to&quot; location as a parameter</>, {
      width: 800,
      height: 400,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: "linear-gradient(135deg, #fbbf24, #f59e0b)",
        }}
        tw="h-full w-full flex"
      >
        <div tw="flex w-full flex-col justify-between text-xl p-8">
          <div tw="flex flex-row items-center justify-between">
            <svg width={211.314 * 0.8} height={110.315 * 0.8} xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
              <g
                transform="translate(-6.232 34.438)"
                style={{
                  display: "flex",
                }}
              >
                <g
                  transform="matrix(.55485 0 0 .52098 69.515 -27.995)"
                  style={{
                    display: "flex",
                    fill: "#262626",
                  }}
                >
                  <path
                    style={{
                      display: "flex",
                      fill: "#262626",
                      strokeWidth: 2.24947,
                      strokeLinecap: "round",
                    }}
                    d="M88.139-78.052c-1.132 1.081-2.96 2.862-3.783 3.71-.148.126-.27.267-.374.417-.006.009-.058.062-.058.065v.027c-.157.257-.256.54-.257.838-.168 16.57-.112 34.687-.2 49.946-.004 1.01 1.004 1.76 2.258 1.683l29.647-1.838c1.254-.078 2.266-.953 2.27-1.963l.2-49.946c.002-.518-.267-.967-.694-1.271-2.849-3.195-7.208-6.785-9.707-8.917-4.495-3.843-4.911-4.071-6.243-3.44-.453.215-3.62 2.498-3.63 2.616-.01.15 1.233 1.306 2.323 2.159l1.158.908 1.09.06c1.215.068 1.795.235 2.653.765a5.676 5.676 0 0 1 2.59 3.796c.05.283.073.559.082.832a5.12 5.12 0 0 1 0 .412l-.002.029c-.01.186-.03.368-.058.548l-.012.068a4.563 4.563 0 0 1-.027.157l.013-.06c-.01.056-.018.112-.03.167.008-.035.01-.072.017-.107l-.02.107c-.225 1.071-.76 2.035-1.576 2.705-1.713 1.407-4.267 1.981-6.435.765-1.054-.591-2.016-1.727-2.45-2.823a3.739 3.739 0 0 1-.181-.562c-.1-.454-.13-.483-1.478-1.517a28.16 28.16 0 0 1-2.544-2.256l-1.17-1.2-.425.348c-.997.917-1.985 1.842-2.947 2.772zM99.13-67.163l3.684-.222-.024 2.633c.992-.006 1.79.083 2.394.265.632.182 1.112.523 1.438 1.025.354.472.595 1.128.725 1.97.13.843.188 1.937.175 3.282l-.038 4.034-4.635.281.038-4.034c.011-1.152-.105-1.872-.35-2.16-.245-.313-.782-.444-1.61-.394-.883.054-1.45.25-1.702.595-.251.345-.38 1.08-.392 2.204l-.029 3.006c-.005.494.018.903.07 1.229.08.297.202.55.365.76.191.207.45.397.78.57.357.17.824.374 1.4.613 1.4.6 2.513 1.112 3.336 1.528.823.39 1.438.844 1.846 1.367.437.495.708 1.125.81 1.887.104.734.148 1.745.135 3.034l-.046 5.022c-.013 1.344-.095 2.446-.241 3.305-.146.86-.4 1.548-.763 2.064-.364.515-.878.901-1.542 1.16-.637.259-1.465.446-2.486.563l-.026 2.634-3.682.224.024-2.633c-.965.004-1.763-.086-2.396-.267-.605-.183-1.083-.51-1.437-.982-.354-.472-.597-1.13-.726-1.972-.13-.843-.187-1.936-.174-3.28l.062-6.463 4.635-.28-.062 6.462c-.005.576.004 1.04.028 1.395.052.326.145.582.281.766.164.182.37.305.617.373.275.038.634.044 1.075.017.855-.052 1.394-.25 1.618-.592.252-.345.383-1.077.394-2.202l.043-4.446a25.164 25.164 0 0 0-.027-1.604c-.023-.437-.115-.789-.278-1.053a1.783 1.783 0 0 0-.654-.74c-.301-.202-.728-.408-1.277-.621-1.483-.596-2.65-1.103-3.501-1.518-.851-.414-1.506-.867-1.97-1.36-.437-.495-.72-1.096-.851-1.8-.104-.735-.15-1.705-.137-2.913l.026-2.963c.013-1.345.094-2.448.24-3.307.146-.86.401-1.546.765-2.062a3.45 3.45 0 0 1 1.54-1.204c.637-.258 1.467-.443 2.488-.56z"
                    transform="matrix(.97797 1.0627 -.92964 1.11772 -89.83 -.29)"
                  />
                  <path
                    style={{
                      display: "flex",
                      fill: "#262626",
                      fillOpacity: 1,
                      stroke: "#262626",
                      strokeWidth: 0,
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 0.7,
                      strokeDasharray: "none",
                      strokeOpacity: 1,
                      paintOrder: "fill markers stroke",
                    }}
                    d="M-113.98-3.253v4.23H76.135c.03-.117.05-.24.081-.353.363-1.353.83-2.65 1.39-3.877zm205.323 0c-1.756.703-3.364 2.231-4.477 4.23H266.757v-4.23H95.085Z"
                  />
                  <path
                    style={{
                      display: "flex",
                      fill: "#262626",
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: 1.21455,
                      strokeLinecap: "round",
                      strokeDasharray: "none",
                      strokeOpacity: 1,
                      paintOrder: "normal",
                    }}
                    d="M101.312-1.846c-1.237-1.67-2.794-2.914-4.566-3.594-1.375-.527-4.01-.63-5.455-.21-4.768 1.379-8.27 6.745-8.27 12.668 0 1.714.432 5.565 1.152 10.259.39 2.552.567 4.23.493 4.686-.168 1.021-1.261 2.273-2.143 2.454-.943.194-2.18-.457-2.648-1.392-.368-.734-1.215-5.784-1.804-10.754-.524-4.42-.402-8.253.35-11.057 1.73-6.448 5.943-11.282 11.404-13.085 1.987-.656 5.533-.663 7.662-.014 3.667 1.116 7.002 3.915 9.115 7.648.43.758.948 1.956 1.408 3.193-5.817-.694-3.912-.495-6.698-.802z"
                  />
                </g>
                <path
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 400,
                    fontStretch: "normal",
                    fontSize: "85.9094px",
                    fontFamily: "'Kenyan Coffee'",
                    display: "flex",
                    fill: "#262626",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 11.0687,
                    strokeLinecap: "butt",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 0.7,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                    paintOrder: "markers stroke fill",
                  }}
                  d="M222.241-8.418c-2.749 0-5.012.173-6.788.516-1.718.287-3.093.946-4.124 1.976-1.03.974-1.746 2.406-2.146 4.296-.344 1.89-.518 4.38-.518 7.473V60.31h9.622V45.19h8.334v15.12h9.88V5.843c0-3.092-.2-5.555-.6-7.388-.4-1.89-1.147-3.321-2.236-4.295-1.03-1.03-2.49-1.718-4.38-2.062-1.832-.343-4.18-.516-7.044-.516zm-41.237.86V.689h7.472V60.31h9.88V.69h7.39v-8.247Zm59.105 0 7.216 32.301-7.73 35.567h9.88l5.497-30.325 5.67 30.325h10.223l-8.076-35.567 6.874-32.301h-9.193l-4.81 26.03-5.413-26.03zm35.138 0V60.31h9.878V-7.558ZM222.411.432c.86 0 1.577.085 2.15.257.572.114 1 .373 1.287.773.287.344.486.887.601 1.632.115.687.172 1.604.172 2.75v31.27h-8.334V5.844c0-1.146.03-2.063.086-2.75.115-.745.317-1.288.604-1.632.343-.4.772-.659 1.287-.773.573-.172 1.288-.258 2.147-.258z"
                  transform="matrix(.77055 0 0 1.29777 -2.157 -2.874)"
                />
                <path
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 400,
                    fontStretch: "normal",
                    fontSize: "56.945px",
                    fontFamily: "'Kenyan Coffee'",
                    display: "flex",
                    fill: "#262626",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 7.33697,
                    strokeLinecap: "butt",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 0.7,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                    paintOrder: "markers stroke fill",
                  }}
                  d="m36.891-22.57-5.81 9.453h4.102l4.156-6.206 4.158 6.206h4.1l-5.752-9.453zM16.902-11.408c-1.86 0-3.397.112-4.612.34-1.215.19-2.182.627-2.904 1.31-.683.646-1.157 1.594-1.423 2.847-.265 1.253-.4 2.906-.4 4.956v27.163c0 2.088.115 3.757.342 5.01.266 1.253.742 2.222 1.425 2.905.683.645 1.63 1.062 2.846 1.252 1.215.228 2.79.342 4.726.342 1.822 0 3.323-.114 4.5-.342 1.176-.19 2.107-.607 2.79-1.252.684-.645 1.14-1.596 1.367-2.849.266-1.252.398-2.94.398-5.066V14.786h-6.32v10.422c0 .797-.038 1.443-.114 1.936-.038.456-.17.815-.398 1.081-.19.266-.475.456-.854.57-.342.076-.8.112-1.369.112-.607 0-1.1-.036-1.479-.112a1.89 1.89 0 0 1-.854-.57c-.19-.266-.324-.625-.4-1.08a26.39 26.39 0 0 1-.056-1.937V-1.955c0-.72.018-1.31.056-1.765.076-.494.21-.874.4-1.14.228-.265.512-.437.854-.513.38-.114.872-.171 1.48-.171.569 0 1.026.057 1.368.171.38.076.664.248.854.514.227.227.36.587.398 1.08.076.456.114 1.065.114 1.824V8.237h6.32V-1.955c0-2.088-.132-3.741-.398-4.956-.227-1.253-.683-2.2-1.366-2.846-.684-.684-1.615-1.121-2.791-1.31-1.177-.229-2.678-.34-4.5-.34zm22.21 0c-1.822 0-3.323.112-4.5.34-1.138.19-2.05.627-2.732 1.31-.684.646-1.158 1.594-1.423 2.847-.228 1.253-.342 2.906-.342 4.956v36.103h6.377V24.124h5.524v10.024h6.549V-1.955c0-2.05-.134-3.683-.4-4.897-.265-1.253-.758-2.204-1.479-2.849-.683-.683-1.653-1.139-2.906-1.367-1.214-.228-2.77-.34-4.668-.34zm11.388.57v5.465h4.954v39.52h6.55v-39.52H66.9v-5.465zM39.225-5.544c.57 0 1.045.057 1.424.171.38.076.665.248.854.514.19.227.322.587.398 1.08.076.456.115 1.065.115 1.824v20.727h-5.524V-1.955c0-.759.02-1.368.058-1.823.076-.494.208-.854.398-1.081.227-.266.512-.438.854-.514.38-.114.853-.171 1.423-.171z"
                  transform="matrix(1.1091 0 0 .90163 -2.157 -2.874)"
                />
                <path
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 400,
                    fontStretch: "normal",
                    fontSize: "57.0119px",
                    fontFamily: "'Kenyan Coffee'",
                    display: "flex",
                    fill: "#262626",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 7.34559,
                    strokeLinecap: "butt",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 0.7,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                    paintOrder: "markers stroke fill",
                  }}
                  d="M92.365 29.768c0 3.307.78 5.682 2.338 7.126s3.572 2.167 6.043 2.167c2.47 0 4.485-.723 6.043-2.167 1.558-1.444 2.337-3.82 2.337-7.126h-3.647c-.038 1.216-.191 2.204-.457 2.965-.228.76-.551 1.37-.97 1.825-.38.418-.854.702-1.424.854a7.295 7.295 0 0 1-1.882.229c-.684 0-1.31-.077-1.88-.23a3.264 3.264 0 0 1-1.427-.853c-.418-.456-.76-1.065-1.026-1.825-.228-.76-.36-1.749-.399-2.965zM16.996 40.943c-1.862 0-3.402.114-4.618.342-1.216.19-2.186.627-2.908 1.311-.684.646-1.159 1.596-1.425 2.85-.266 1.255-.399 2.909-.399 4.961V77.6c0 2.09.113 3.763.341 5.018.266 1.254.742 2.224 1.427 2.908.684.646 1.633 1.063 2.849 1.253 1.216.228 2.795.344 4.733.344 1.825 0 3.326-.116 4.504-.344 1.178-.19 2.109-.607 2.793-1.253.684-.646 1.14-1.596 1.368-2.85.266-1.254.4-2.947.4-5.076V67.168h-6.328V77.6c0 .799-.04 1.447-.115 1.94-.038.457-.171.817-.4 1.083-.19.266-.473.457-.854.57-.342.077-.798.113-1.368.113-.608 0-1.103-.036-1.483-.112a1.89 1.89 0 0 1-.854-.57c-.19-.267-.323-.627-.4-1.083a26.303 26.303 0 0 1-.057-1.94V50.406c0-.722.02-1.311.058-1.767.076-.494.209-.875.399-1.14.228-.267.512-.437.854-.513.38-.114.875-.173 1.483-.173.57 0 1.026.059 1.368.173.38.076.665.246.855.512.228.228.36.588.399 1.083.076.456.115 1.065.115 1.825v10.206h6.327V50.407c0-2.09-.133-3.744-.399-4.96-.228-1.255-.684-2.205-1.368-2.85-.684-.685-1.615-1.122-2.793-1.312-1.178-.228-2.68-.342-4.504-.342zm22.462 0c-1.938 0-3.515.114-4.731.342-1.217.19-2.167.627-2.852 1.311-.684.646-1.158 1.596-1.424 2.85-.228 1.217-.343 2.871-.343 4.961V77.6c0 2.09.115 3.763.343 5.018.266 1.254.74 2.224 1.424 2.908.685.646 1.635 1.063 2.852 1.253 1.216.228 2.793.344 4.731.344 1.938 0 3.515-.116 4.732-.344 1.216-.19 2.167-.607 2.85-1.253.723-.684 1.197-1.654 1.425-2.908.266-1.255.4-2.927.4-5.018V50.407c0-2.09-.134-3.744-.4-4.96-.228-1.255-.702-2.205-1.424-2.85-.684-.685-1.635-1.122-2.851-1.312-1.217-.228-2.794-.342-4.732-.342Zm22.52 0c-1.938 0-3.515.114-4.731.342-1.178.19-2.11.627-2.795 1.311-.646.684-1.102 1.654-1.368 2.909-.228 1.254-.343 2.924-.343 5.015v4.334c0 1.064.04 1.957.115 2.68a7.25 7.25 0 0 0 .456 1.938c.266.57.628 1.102 1.084 1.597.494.456 1.14.95 1.938 1.482a52.64 52.64 0 0 0 1.767 1.082c.684.38 1.35.761 1.995 1.141.646.342 1.256.684 1.826 1.027.57.304 1.044.587 1.424.853.723.494 1.16 1.009 1.312 1.54.152.533.228 1.408.228 2.624V77.6c0 1.559-.172 2.567-.514 3.023-.304.456-1.065.683-2.28.683-.609 0-1.102-.036-1.482-.112a1.55 1.55 0 0 1-.798-.57c-.19-.267-.323-.627-.399-1.083a26.303 26.303 0 0 1-.058-1.94v-8.95H52.97v8.95c0 2.128.133 3.82.399 5.075.266 1.254.74 2.204 1.425 2.85.684.646 1.614 1.063 2.793 1.253 1.178.228 2.7.344 4.561.344 1.939 0 3.516-.116 4.732-.344 1.216-.19 2.167-.607 2.851-1.253.684-.684 1.14-1.654 1.368-2.908.266-1.255.4-2.927.4-5.018v-7.238c0-1.254-.058-2.301-.172-3.137-.076-.837-.266-1.557-.57-2.166-.266-.608-.704-1.158-1.312-1.653-.57-.494-1.329-1.047-2.28-1.655a40.003 40.003 0 0 0-3.592-1.994c-1.064-.532-1.919-1.008-2.565-1.426-.76-.456-1.235-.894-1.425-1.312-.19-.456-.286-1.14-.286-2.052V50.52c0-.798.019-1.444.057-1.938.076-.495.209-.855.399-1.083.19-.266.457-.436.8-.512.38-.114.891-.173 1.537-.173.608 0 1.103.059 1.483.173.38.076.666.246.856.512.19.228.303.588.341 1.083.076.494.115 1.14.115 1.938v5.587h6.386V50.52c0-2.09-.133-3.761-.4-5.015-.227-1.255-.684-2.225-1.368-2.909-.684-.684-1.635-1.121-2.85-1.311-1.18-.228-2.737-.342-4.676-.342zm38.54 0c-1.824 0-3.325.114-4.504.342-1.14.19-2.052.627-2.736 1.311-.684.646-1.159 1.596-1.425 2.85-.228 1.255-.342 2.909-.342 4.961v36.145h6.385V76.518h5.53v10.034h6.557V50.407c0-2.052-.133-3.686-.4-4.902-.265-1.255-.76-2.206-1.482-2.852-.684-.685-1.654-1.14-2.908-1.368-1.216-.228-2.775-.342-4.675-.342zm-27.366.57v5.474h4.96v39.565h6.558V46.987h4.902v-5.473zm-33.637 5.301c.57 0 1.026.059 1.368.173.38.076.666.246.856.512.228.228.361.588.399 1.083.076.456.113 1.065.113 1.825V77.6c0 .76-.037 1.388-.113 1.882-.038.457-.17.837-.399 1.141-.19.266-.476.457-.856.57-.38.077-.873.113-1.481.113-.57 0-1.045-.036-1.425-.112a1.895 1.895 0 0 1-.856-.57c-.19-.267-.323-.627-.4-1.083a26.456 26.456 0 0 1-.056-1.94V50.406c0-1.482.17-2.452.512-2.908.342-.456 1.121-.685 2.338-.685zm61.118 0c.57 0 1.044.059 1.425.173.38.076.664.246.854.512.19.228.323.588.399 1.083.076.456.115 1.065.115 1.825V71.16h-5.53V50.407c0-.76.019-1.37.057-1.825.076-.495.209-.855.399-1.083.228-.266.512-.436.854-.512.38-.114.857-.173 1.427-.173z"
                  transform="matrix(1.1063 0 0 .90391 -2.157 -2.874)"
                />
              </g>
            </svg>
            <div tw="text-white bg-teal-900 rounded-lg shadow-lg py-6 px-2 font-black text-4xl tracking-tight">
              Verifică tariful unei curse de taxi!
            </div>
          </div>
          <div tw="relative flex flex-row w-full items-center">
            <p tw="absolute bottom-1/2 pb-2">De la:</p>
            <h1
              style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
              tw="text-2xl grow px-4 py-2 rounded-lg shadow-xl bg-white/60"
            >
              {from}
            </h1>
          </div>
          <div tw="relative flex flex-row w-full items-center">
            <p tw="absolute bottom-1/2 pb-2">Până la:</p>
            <h1
              style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
              tw="text-2xl grow px-4 py-2 rounded-lg shadow-xl bg-white/60"
            >
              {to}
            </h1>
          </div>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
    },
  );
}
