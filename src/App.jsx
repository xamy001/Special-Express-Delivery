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
  MessageCircle,
  Mail,
  CheckCircle2,
  Circle,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { translations } from "./translations";
import { findShipment } from "./tracking";

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
      title: t.stageRegistered,
      description: t.stageRegisteredDescription,
    },
    {
      title: t.stageDispatched,
      description: t.stageDispatchedDescription,
    },
    {
      title: t.stageInTransit,
      description: t.stageInTransitDescription,
    },
    {
      title: t.stageArrived,
      description: t.stageArrivedDescription,
    },
  ];

  // Refresh the displayed shipment status every minute.
  useEffect(() => {
    if (!lastSearchedNumber || !shipment) return;

    const timer = setInterval(() => {
      const updatedShipment = findShipment(lastSearchedNumber);
      if (updatedShipment) {
        setShipment(updatedShipment);
      }
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, [lastSearchedNumber, Boolean(shipment)]);

  function handleTrackingSubmit(event) {
    event.preventDefault();

    const result = findShipment(trackingNumber);

    setLastSearchedNumber(trackingNumber.trim().toUpperCase());

    if (!result) {
      setShipment(null);
      setTrackingError(t.trackingError);
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
          <div className="rounded-xl bg-blue-700 p-2 text-white">
            <Package size={25} />
          </div>

          <div>
            <h1 className="text-base font-extrabold tracking-wide sm:text-xl">
              <span className="text-blue-700">SPECIAL EXPRESS</span>{" "}
              <span>DELIVERY</span>
            </h1>
            <p className="text-xs text-slate-500">
              {t.internationalShipping.toUpperCase()}
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-6 font-medium lg:flex">
          <a href="#home" className="hover:text-blue-700">
            {t.home}
          </a>
          <a href="#tracking" className="hover:text-blue-700">
            {t.trackShipment}
          </a>
          <a href="#services" className="hover:text-blue-700">
            {t.ourServices}
          </a>
          <a href="#contact" className="hover:text-blue-700">
            {t.contact}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="language-select">
            {t.language}
          </label>

          <select
            id="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={t.language}
            className="max-w-36 rounded-lg border border-slate-300 bg-white px-2 py-3 text-sm font-semibold outline-none focus:border-blue-600 sm:max-w-none sm:px-3"
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <a
            href="#tracking"
            className="hidden rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800 sm:block"
          >
            {t.trackPackage}
          </a>

          <a
            href="#contact"
            aria-label={t.contact}
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
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
              <Globe2 size={17} />
              {t.internationalShipping}
            </div>

            <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">
              {t.heroTitle}
              <span className="block text-blue-400">
                {t.heroHighlight}
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-slate-300">
              {t.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#tracking"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-4 font-bold hover:bg-blue-500"
              >
                {t.trackAShipment} <ArrowRight size={19} />
              </a>

              <a
                href="#services"
                className="rounded-lg border border-white/20 px-6 py-4 font-semibold hover:bg-white/10"
              >
                {t.exploreServices}
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1100&q=85"
              alt={t.internationalDelivery}
              className="h-80 w-full rounded-2xl object-cover shadow-2xl md:h-107.5"
            />

            <div className="absolute -bottom-5 left-4 right-4 rounded-xl bg-white p-5 text-slate-900 shadow-xl md:-left-8 md:right-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
                  <Plane size={25} />
                </div>

                <div>
                  <p className="font-bold">{t.internationalDelivery}</p>
                  <p className="text-sm text-slate-500">
                    {t.followOnline}
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

      {/* Tracking */}
      <section id="tracking" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-bold uppercase tracking-widest text-blue-700">
            {t.shipmentTracking}
          </p>

          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            {t.wherePackage}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            {t.trackingDescription}
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
                placeholder={t.trackingPlaceholder}
                aria-label={t.trackingAria}
                required
                className="w-full min-w-0 py-3 outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-7 py-4 font-bold text-white hover:bg-blue-800"
            >
              {t.trackNow}
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
                    {t.sampleTrackingNumber}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">
                    {shipment.trackingNumber}
                  </h3>
                </div>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800">
                  {shipment.status}
                </span>
              </div>

              {/* Origin and Destination */}
              <div className="mx-5 mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:mx-8 sm:p-6">
                <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                      <MapPin size={23} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {t.origin}
                      </p>
                      <p className="mt-1 wrap-break-word font-extrabold text-slate-900">
                        {shipment.origin}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {t.startingPoint}
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center text-blue-600 sm:flex">
                    <div className="h-px w-8 bg-blue-200" />
                    <Plane size={22} />
                    <div className="h-px w-8 bg-blue-200" />
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-green-100 p-3 text-green-700">
                      <Globe2 size={23} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {t.destination}
                      </p>
                      <p className="mt-1 wrap-break-word font-extrabold text-slate-900">
                        {shipment.destination}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {t.deliveryDestination}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated Arrival */}
              <div className="mx-5 mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:mx-8">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                    <Clock3 size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {t.estimatedArrival}
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-slate-900">
                      {new Date(shipment.estimatedArrival).toLocaleString()}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      {t.estimatedArrivalNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mx-5 mt-8 flex items-center justify-between gap-3 sm:mx-8">
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {t.shipmentProgress}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {t.followShipmentStages}
                  </p>
                </div>

                <div className="shrink-0 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                  {t.step} {shipment.stage + 1} {t.of} 4
                </div>
              </div>

              <div className="mx-5 mt-7 space-y-2 sm:mx-8">
                {trackingStages.map((stage, index) => {
                  const completed = index < shipment.stage;
                  const current = index === shipment.stage;

                  return (
                    <div
                      key={stage.title}
                      className={`flex gap-4 rounded-2xl p-4 transition ${
                        index === shipment.stage
                          ? "border border-blue-200 bg-blue-50/70"
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
                            className="shrink-0 text-blue-700"
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
                              completed ? "bg-green-500" : "bg-slate-200"
                            }`}
                          />
                        )}
                      </div>

                      <div className="pb-2">
                        <p
                          className={`font-bold ${
                            current
                              ? "text-blue-700"
                              : completed
                                ? "text-green-700"
                                : "text-slate-400"
                          }`}
                        >
                          {stage.title}
                          {current ? ` — ${t.currentStatus}` : ""}
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
            <p className="font-bold uppercase tracking-widest text-blue-700">
              {t.whatWeOffer}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              {t.shippingMadeSimple}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ServiceCard
              icon={<Package size={28} />}
              title={t.packageRegistration}
              description={t.packageDescription}
            />

            <ServiceCard
              icon={<Plane size={28} />}
              title={t.internationalTransit}
              description={t.transitDescription}
            />

            <ServiceCard
              icon={<Clock3 size={28} />}
              title={t.shipmentUpdates}
              description={t.updatesDescription}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-blue-950 p-8 text-white md:p-12">
          <h2 className="text-3xl font-extrabold">{t.needHelp}</h2>

          <p className="mt-3 max-w-xl leading-7 text-blue-100">
            {t.contactDescription}
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href="specialexpressdc1@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-blue-950"
            >
              <Mail size={19} /> {t.emailUs}
            </a>

            <a
              href="https://wa.me/YOUR_WHATSAPP_NUMBER"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
            >
              <MessageCircle size={19} /> {t.whatsappUs}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-7 text-center text-sm text-slate-500">
        <p>
          ©️ {new Date().getFullYear()} Special Express Delivery.{" "}
          {t.allRights}
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-xs leading-5">
          {t.simulatedNotice}
        </p>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex rounded-xl bg-blue-100 p-4 text-blue-700">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default App;