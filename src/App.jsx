import { useEffect, useState } from "react";
import {
  Package,
  Plane,
  Globe2,
  Search,
  ShieldCheck,
  Clock3,
  ArrowRight,
  Menu,
  Mail,
  CheckCircle2,
  Circle,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { translations } from "./translations";
import { findShipment } from "./tracking";
import special from "./assets/special.jpeg";

const languages = [
  { code: "en", label: "🇬🇧 English" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "pt", label: "🇵🇹 Português" },
];

function App() {
  const [language, setLanguage] = useState("en");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [trackingError, setTrackingError] = useState("");
  const [lastSearchedNumber, setLastSearchedNumber] = useState("");

  const t = translations[language];

  const trackingStages = [
    {
      title: t.stageRegistered || "Registered",
      description:
        t.stageRegisteredDescription ||
        "Shipment details received and registered in Manchester, England.",
    },
    {
      title: t.stageDispatched || "Dispatched",
      description:
        t.stageDispatchedDescription ||
        "Package loaded and dispatched from international air facility.",
    },
    {
      title: t.stageInTransit || "In Transit",
      description:
        t.stageInTransitDescription ||
        "Transatlantic express flight en route to South America.",
    },
    {
      title: t.stageArrived || "Arrived in destination country",
      description:
        t.stageArrivedDescription ||
        "Shipment has landed in Bogota, Colombia for final customs and delivery.",
    },
  ];

  const localizedShipmentStatus = shipment
    ? [
        t.stageRegistered,
        t.stageDispatched,
        t.stageInTransit,
        t.stageArrived,
      ][shipment.stage] || shipment.status
    : "";

  const formattedArrival = shipment
    ? new Intl.DateTimeFormat(language, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(shipment.estimatedArrival))
    : "";

  // Refresh displayed shipment status every 10 seconds
  useEffect(() => {
    if (!lastSearchedNumber || !shipment) return;

    const timer = setInterval(() => {
      const updatedShipment = findShipment(lastSearchedNumber);

      if (updatedShipment) {
        setShipment(updatedShipment);
      }
    }, 10 * 1000);

    return () => clearInterval(timer);
  }, [lastSearchedNumber, Boolean(shipment)]);

  function handleTrackingSubmit(event) {
    event.preventDefault();

    const normalizedNumber = trackingNumber.trim().toUpperCase();
    const result = findShipment(normalizedNumber);

    setLastSearchedNumber(normalizedNumber);

    if (!result) {
      setShipment(null);
      setTrackingError(t.trackingError || "Invalid tracking number. Please check and try again.");
      return;
    }

    setTrackingError("");
    setShipment(result);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-16">
        <a href="#home" className="flex items-center gap-2">
          <div className="rounded-xl bg-red-700 p-2 text-white">
            <Package size={25} />
          </div>

          <div>
            <h1 className="text-base font-extrabold tracking-wide sm:text-xl">
              <span className="text-red-700">SPECIAL EXPRESS</span>{" "}
              <span>DELIVERY</span>
            </h1>

            <p className="text-xs text-slate-500">
              {t.internationalShipping ? t.internationalShipping.toUpperCase() : "INTERNATIONAL COURIER & CARGO"}
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-6 font-medium lg:flex">
          <a href="#home" className="hover:text-red-700">
            {t.home || "Home"}
          </a>

          <a href="#tracking" className="hover:text-red-700">
            {t.trackShipment || "Track Shipment"}
          </a>

          <a href="#services" className="hover:text-red-700">
            {t.ourServices || "Our Services"}
          </a>

          <a href="#contact" className="hover:text-red-700">
            {t.contact || "Contact"}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="language-select">
            {t.language || "Language"}
          </label>

          <select
            id="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={t.language || "Select Language"}
            className="max-w-36 rounded-lg border border-slate-300 bg-white px-2 py-3 text-sm font-semibold outline-none focus:border-red-600 sm:max-w-none sm:px-3"
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <a
            href="#tracking"
            className="hidden rounded-lg bg-red-700 px-4 py-3 text-sm font-semibold text-white hover:bg-red-800 sm:block"
          >
            {t.trackPackage || "Track Package"}
          </a>

          <a
            href="#contact"
            aria-label={t.contact || "Contact"}
            className="rounded-lg p-2 lg:hidden"
          >
            <Menu size={25} />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white md:px-16 md:py-28"
      >
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-200">
              <Globe2 size={17} />
              {t.internationalShipping || "International Express Courier"}
            </div>

            <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">
              {t.heroTitle || "Fast & Reliable"}
              <span className="block text-red-500">
                {t.heroHighlight || "Global Express Delivery"}
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-slate-300">
              {t.heroDescription || "Track your international cargo and air express shipments in real time with end-to-end transparency."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#tracking"
                className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-4 font-bold hover:bg-red-600 transition"
              >
                {t.trackAShipment || "Track Shipment"} <ArrowRight size={19} />
              </a>

              <a
                href="#services"
                className="rounded-lg border border-white/20 px-6 py-4 font-semibold hover:bg-white/10 transition"
              >
                {t.exploreServices || "Explore Services"}
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src={special}
              alt={t.internationalDelivery || "Special Express Delivery Plane"}
              className="h-80 w-full rounded-2xl object-cover shadow-2xl md:h-[430px]"
            />

            <div className="absolute -bottom-5 left-4 right-4 rounded-xl bg-white p-5 text-slate-900 shadow-xl md:-left-8 md:right-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-3 text-red-700">
                  <Plane size={25} />
                </div>

                <div>
                  <p className="font-bold">
                    {t.internationalDelivery || "Express Air Transit"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {t.followOnline || "Live Real-Time Tracking"}
                  </p>
                </div>

                <ShieldCheck
                  className="ml-auto shrink-0 text-green-600"
                  size={27}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="tracking" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-bold uppercase tracking-widest text-red-700">
            {t.shipmentTracking || "SHIPMENT TRACKING"}
          </p>

          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            {t.wherePackage || "Where is your package?"}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            {t.trackingDescription || "Enter your AWB or tracking code below to check real-time stage updates."}
          </p>

          <form
            onSubmit={handleTrackingSubmit}
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="shrink-0 text-slate-400" size={23} />

              <input
                type="text"
                value={trackingNumber}
                onChange={(event) => setTrackingNumber(event.target.value)}
                placeholder={t.trackingPlaceholder || "Enter Tracking Code (e.g. 6624)"}
                aria-label={t.trackingAria || "Tracking Code Input"}
                required
                className="w-full min-w-0 py-3 outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-red-700 px-7 py-4 font-bold text-white hover:bg-red-800 transition"
            >
              {t.trackNow || "Track Now"}
            </button>
          </form>

          {trackingError && (
            <div
              role="alert"
              className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-red-700"
            >
              <AlertCircle className="mt-0.5 shrink-0" size={22} />
              <p>{trackingError}</p>
            </div>
          )}

          {shipment && (
            <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4 bg-slate-50 p-6 sm:p-8">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    AWB / Tracking Code
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold">
                    {shipment.trackingNumber}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Sender: <span className="font-semibold text-slate-800">{shipment.sender}</span> | Receiver: <span className="font-semibold text-slate-800">{shipment.receiver}</span>
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    shipment.stage === 3
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {localizedShipmentStatus}
                </span>
              </div>

              {/* Origin and Destination */}
              <div className="mx-5 mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:mx-8 sm:p-6">
                <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-red-100 p-3 text-red-700">
                      <MapPin size={23} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {t.origin || "Origin"}
                      </p>

                      <p className="mt-1 break-words font-extrabold text-slate-900">
                        {shipment.origin}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {t.startingPoint || "Starting Hub"}
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center text-red-600 sm:flex">
                    <div className="h-px w-8 bg-red-200" />
                    <Plane size={22} />
                    <div className="h-px w-8 bg-red-200" />
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-green-100 p-3 text-green-700">
                      <Globe2 size={23} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {t.destination || "Destination"}
                      </p>

                      <p className="mt-1 break-words font-extrabold text-slate-900">
                        {shipment.destination}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {t.deliveryDestination || "Final Airport / Address"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated Arrival */}
              <div className="mx-5 mt-6 rounded-2xl border border-red-100 bg-red-50 p-5 sm:mx-8">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-red-100 p-3 text-red-700">
                    <Clock3 size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                      {t.estimatedArrival || "Estimated Arrival Time"}
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-slate-900">
                      {formattedArrival}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      {t.estimatedArrivalNote || "32-Hour Transatlantic Express Transit Period"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="mx-5 mt-8 flex items-center justify-between gap-3 sm:mx-8">
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {t.shipmentProgress || "Shipment Progress"}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.followShipmentStages || "Follow the 4 delivery stages"}
                  </p>
                </div>

                <div className="shrink-0 rounded-full bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                  {t.step || "Step"} {shipment.stage + 1} {t.of || "of"} 4
                </div>
              </div>

              {/* 4 Stages Display */}
              <div className="mx-5 mt-7 space-y-2 sm:mx-8 pb-8">
                {trackingStages.map((stage, index) => {
                  const completed = index < shipment.stage;
                  const current = index === shipment.stage;

                  return (
                    <div
                      key={index}
                      className={`flex gap-4 rounded-2xl p-4 transition ${
                        current
                          ? "border border-red-200 bg-red-50/70"
                          : "border border-transparent bg-white"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        {completed ? (
                          <CheckCircle2
                            className="shrink-0 text-green-600"
                            size={27}
                          />
                        ) : current ? (
                          <Clock3
                            className="shrink-0 text-red-700"
                            size={27}
                          />
                        ) : (
                          <Circle
                            className="shrink-0 text-slate-300"
                            size={27}
                          />
                        )}

                        {index < trackingStages.length - 1 && (
                          <div
                            className={`mt-2 min-h-8 w-0.5 ${
                              completed
                                ? "bg-green-500"
                                : "bg-slate-200"
                            }`}
                          />
                        )}
                      </div>

                      <div className="pb-2">
                        <p
                          className={`font-bold ${
                            current
                              ? "text-red-700"
                              : completed
                                ? "text-green-700"
                                : "text-slate-400"
                          }`}
                        >
                          {stage.title}
                          {current ? ` — ${t.currentStatus || "Current Status"}` : ""}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-slate-50 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-widest text-red-700">
              {t.whatWeOffer || "WHAT WE OFFER"}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              {t.shippingMadeSimple || "Global Logistics Made Simple"}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ServiceCard
              icon={<Package size={28} />}
              title={t.packageRegistration || "Package Registration"}
              description={
                t.packageDescription ||
                "Fast AWB documentation and origin scanning for all outgoing parcels."
              }
            />

            <ServiceCard
              icon={<Plane size={28} />}
              title={t.internationalTransit || "International Air Transit"}
              description={
                t.transitDescription ||
                "Direct cargo flights guaranteeing swift transatlantic border crossing."
              }
            />

            <ServiceCard
              icon={<Clock3 size={28} />}
              title={t.shipmentUpdates || "24/7 Live Status Updates"}
              description={
                t.updatesDescription ||
                "Real-time timeline tracking from departure hub to final destination landing."
              }
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-950 p-8 text-white md:p-12 border border-red-900/30">
          <h2 className="text-3xl font-extrabold">{t.needHelp || "Need Help with Your Delivery?"}</h2>

          <p className="mt-3 max-w-xl leading-7 text-slate-300">
            {t.contactDescription || "Have questions about your consignment or custom clearance? Send us an email directly."}
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href="mailto:specialexpressdc1@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3.5 font-bold text-white hover:bg-red-800 transition"
            >
              <Mail size={20} />
              {t.emailUs || "Email Us Now"}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-7 text-center text-sm text-slate-500">
        <p>
          ©️ 2024 Special Express Delivery. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex rounded-xl bg-red-100 p-4 text-red-700">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default App;