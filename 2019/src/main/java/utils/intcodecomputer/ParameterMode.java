package utils.intcodecomputer;

public enum ParameterMode {
	
	/**
	 * Position mode, the parameter is interpreted as an address in memory
	 */
	POSITION_MODE("0"),
	
	/**
	 * Immediate mode, the parameter is interpreted as a value
	 */
	IMMEDIATE_MODE("1");
	
	private final String code;
	
	private ParameterMode(final String code) {
		this.code = code;
	}
	
	public static ParameterMode fromCode(final String code) {
		for (ParameterMode parameterMode : values()) {
			if (parameterMode.code.equals(code)) {
				return parameterMode;
			}
		}
		// Position mode is the default as per the description of the problem
		return POSITION_MODE;
	}
}
